import { Component, signal } from "@angular/core";
import { ToyService } from "../../services/toy.service";
import { Router, RouterLink } from "@angular/router";
import { ToyModel } from "../../models/toy.model";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-home",
  imports: [RouterLink],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  protected toys = signal<ToyModel[]>([])

  constructor(protected router: Router) {
    ToyService.getToys()
      .then(rsp => this.toys.set(rsp.data))
  }

  addToCart(toy: ToyModel) {
    try {
        CartService.addToCart(toy);
        alert("Toy added to cart");
    } catch (error) {
        alert("You must be logged in to reserve toys");
        this.router.navigate(['/login']);
    }
}


}
