import { ToyModel } from "../models/toy.model";
import { CartItemModel } from "../models/cartItem.model";
import { UserService } from "./user.service";
import { ReviewService } from "./review.service";

export class CartService {


    private static getCartKey() {
        const activeUser = UserService.getActiveUser();
        if (!activeUser) {
            throw new Error("USER_NOT_FOUND");
        }
        return `cart_${activeUser.email}`;
    }

    private static normalizeCartItems(items: any[]): CartItemModel[] {
        return items.map(item => {
            return {
                toy: item.toy,
                quantity: item.quantity ?? 1,
                status: item.status ?? 'reserved',
                rating: item.rating ?? null,
                review: item.review ?? ''
            };
        });
    }
    

   static getCartItems(): CartItemModel[] {
        const items = JSON.parse(
            localStorage.getItem(this.getCartKey()) || '[]'
        );
        return this.normalizeCartItems(items);
    }


   static saveCartItems(items: CartItemModel[]) {
        localStorage.setItem(
            this.getCartKey(),
            JSON.stringify(items)
        );
    }

    static addToCart(toy: ToyModel) {
        const cartItems = this.getCartItems();

        const existingItem = cartItems.find(
            item => item.toy.id === toy.id
        );

        if (existingItem && existingItem.status === 'reserved') {
            existingItem.quantity++;
        } else {
            cartItems.push({
                toy: toy,
                quantity: 1,
                status: 'reserved',
                rating: null,
                review: ''
            });
        }
        this.saveCartItems(cartItems);
    }


    static increaseQuantity(toyId: number) {
        const cartItems = this.getCartItems();

        const item = cartItems.find(
            item => item.toy.id === toyId
        );

        if (!item) {
            throw new Error("ITEM_NOT_FOUND");
        }

        if (item.status !== 'reserved') {
            throw new Error("ONLY_RESERVED_ITEMS_CAN_BE_CHANGED");
        }
        item.quantity++;
        this.saveCartItems(cartItems);
    }


     static decreaseQuantity(toyId: number) {
        const cartItems = this.getCartItems();

        const item = cartItems.find(
            item => item.toy.id === toyId
        );

        if (!item) {
            throw new Error("ITEM_NOT_FOUND");
        }

        if (item.status !== 'reserved') {
            throw new Error("ONLY_RESERVED_ITEMS_CAN_BE_CHANGED");
        }

        if (item.quantity <= 1) {
            throw new Error("QUANTITY_CANNOT_BE_LESS_THAN_ONE");
        }
        item.quantity--;
        this.saveCartItems(cartItems);
    }


    static removeItem(toyId: number) {
        const cartItems = this.getCartItems();

        const filteredItems = cartItems.filter(
            item => item.toy.id !== toyId
        );

        this.saveCartItems(filteredItems);
    }

    static markItemAsArrived(toyId: number) {
        const cartItems = this.getCartItems();

        const item = cartItems.find(
            item => item.toy.id === toyId
        );

        if (!item) {
            throw new Error("ITEM_NOT_FOUND");
        }

        if (item.status !== 'reserved') {
            throw new Error("ONLY_RESERVED_ITEMS_CAN_BE_BOUGHT");
        }
        item.status = 'delivered';
        this.saveCartItems(cartItems);
    }

    static markAllReservedAsArrived() {
        const cartItems = this.getCartItems();
        cartItems.forEach(item => {
            if (item.status === 'reserved') {
                item.status = 'delivered';
            }
        });
        this.saveCartItems(cartItems);
    }


    static rateItem(toyId: number, rating: number, comment: string) {
        const cartItems = this.getCartItems();

        const item = cartItems.find(
            item => item.toy.id === toyId
        );

        if (!item) {
            throw new Error("ITEM_NOT_FOUND");
        }

        if (item.status !== 'delivered') {
            throw new Error("ONLY_ARRIVED_ITEMS_CAN_BE_RATED");
        }
        item.rating = rating;
        item.review = comment;
        ReviewService.addReview(toyId, rating, comment);
        this.saveCartItems(cartItems);
    }


}