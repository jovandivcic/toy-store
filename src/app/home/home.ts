import { Component, signal } from "@angular/core";
import { ToyService } from "../../services/toy.service";
import { RouterLink } from "@angular/router";
import { ToyModel } from "../../models/toy.model";

@Component({
  selector: "app-home",
  imports: [RouterLink],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  protected toys = signal<ToyModel[]>([])

  constructor() {
    ToyService.getToys()
      .then(rsp => this.toys.set(rsp.data))
  }
}
