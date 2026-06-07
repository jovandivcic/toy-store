import { Component, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToyService } from "../../services/toy.service";
import { ToyModel } from "../../models/toy.model";

@Component({
  selector: "app-details",
  imports: [],
  templateUrl: "./details.html",
  styleUrl: "./details.css",
})
export class Details {
  protected toy = signal<ToyModel | null>(null)

  constructor(private route: ActivatedRoute){
    this.route.params.subscribe((params: any) => {
      ToyService.getToyById(Number(params.id))
        .then(toy => this.toy.set(toy ?? null))
    })
  }

  convertToString(){
    return JSON.stringify(this.toy())
  }
}
