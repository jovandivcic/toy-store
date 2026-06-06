import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MainService } from "../../services/main.service";

@Component({
  selector: "app-signup",
  imports: [RouterLink],
  templateUrl: "./signup.html",
  styleUrl: "./signup.css",
})
export class Signup {
  protected favoriteToys = signal<String[]>([])

  constructor() {
    MainService.getFavoriteToys()
      .then(rsp => this.favoriteToys.set(rsp.data))
  }
}
