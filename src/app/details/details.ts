import { Component, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToyService } from "../../services/toy.service";
import { ToyModel } from "../../models/toy.model";
import { ReviewModel } from "../../models/review.model";
import { ReviewService } from "../../services/review.service";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-details",
  imports: [],
  templateUrl: "./details.html",
  styleUrl: "./details.css",
})
export class Details {
  protected toy = signal<ToyModel | null>(null)
  protected reviews = signal<ReviewModel[]>([]);
  protected averageRating = signal<number>(0);

  /*constructor(private route: ActivatedRoute){
    this.route.params.subscribe((params: any) => {
      ToyService.getToyById(Number(params.id))
        .then(toy => this.toy.set(toy ?? null))
    })
  }*/

    constructor(private route: ActivatedRoute){
      this.route.params.subscribe((params: any) => {
        const toyId = Number(params.id);
        ToyService.getToyById(toyId).then(toy => this.toy.set(toy ?? null));

        this.reviews.set(ReviewService.getReviewsByToyId(toyId));

        this.averageRating.set(ReviewService.getAverageRatingByToyId(toyId));
      });
    }

    protected getStars(rating: number): number[] {
      const wholeRating = Math.floor(rating);
      return Array.from({ length: wholeRating },(_, index) => index + 1);
    }

     protected addToCart(toy: ToyModel) {
      try {
        CartService.addToCart(toy);
        alert("Toy added to cart");
      } catch (error) {
        alert("You must be logged in to add toys to cart");
      }
    }

  convertToString(){
    return JSON.stringify(this.toy())
  }
}
