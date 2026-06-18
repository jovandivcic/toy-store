import { Component, computed, signal } from "@angular/core";
import { Router } from "@angular/router";
import { CartItemModel } from "../../models/cartItem.model";
import { UserService } from "../../services/user.service";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-cart",
  imports: [],
  templateUrl: "./cart.html",
  styleUrl: "./cart.css",
})
export class Cart {

  protected cartItems = signal<CartItemModel[]>([]);
  protected selectedItem = signal<CartItemModel | null>(null);
  protected ratingValue = signal<number>(5);
  protected ratingComment = signal<string>("");

  protected reservedItems = computed(() => {
    return this.cartItems().filter(
      item => item.status === 'reserved'
    );
  });

  protected totalReservedPrice = computed(() => {
    return this.reservedItems().reduce((total, item) => total + item.toy.price * item.quantity, 0);
  });

  constructor(private router: Router) {
    try {
      UserService.getActiveUser();
      this.loadCartItems();
    } catch (error) {
      alert("You must be logged in to access the cart");
      this.router.navigate(['/login']);
    }
  }

  private loadCartItems() {
    this.cartItems.set(CartService.getCartItems());
  }

  increaseQuantity(toyId: number) {
    try {
      CartService.increaseQuantity(toyId);
      this.loadCartItems();
    } catch (error) {
      alert("You can change quantity only for reserved toys");
    }
  }

  decreaseQuantity(toyId: number) {
    try {
      CartService.decreaseQuantity(toyId);
      this.loadCartItems();
    } catch (error) {
      alert("Quantity cannot be less than 1");
    }
  }

  removeItem(toyId: number) {
    CartService.removeItem(toyId);
    this.loadCartItems();
  }

  buyItemNow(toyId: number) {
    try {
      CartService.markItemAsArrived(toyId);
      this.loadCartItems();
    } catch (error) {
      alert("Only reserved toys can be bought");
    }
  }

   buyAllReservedItems() {
    if (this.reservedItems().length === 0) {
      alert("There are no reserved items in your cart");
      return;
    }

    CartService.markAllReservedAsArrived();

    this.loadCartItems();

    alert("All reserved items are now marked as arrived");
  }


  openRatingModal(item: CartItemModel) {
    if (item.status !== 'delivered') {
      alert("You can rate only arrived toys");
      return;
    }

    this.selectedItem.set(item);
    this.ratingValue.set(item.rating ?? 5);
    this.ratingComment.set(item.review ?? '');
  }

  closeRatingModal() {
    this.selectedItem.set(null);
    this.ratingValue.set(5);
    this.ratingComment.set('');
  }

  updateRatingValue(event: Event) {
    const value = Number(
      (event.target as HTMLSelectElement).value
    );

    this.ratingValue.set(value);
  }

  updateRatingComment(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;

    this.ratingComment.set(value);
  }

  confirmRating() {
    const item = this.selectedItem();

    if (!item) {
      return;
    }

    if (this.ratingValue() < 1 || this.ratingValue() > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }

    if (this.ratingComment().trim().length === 0) {
      alert("Please leave a comment");
      return;
    }

    try {
      CartService.rateItem(
        item.toy.id,
        this.ratingValue(),
        this.ratingComment().trim()
      );

      this.loadCartItems();
      this.closeRatingModal();

      alert("Thank you for your rating");
    } catch (error) {
      alert("Only delivered toys can be rated");
    }
  }



}
