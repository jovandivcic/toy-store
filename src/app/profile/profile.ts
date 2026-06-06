import { Component, signal } from "@angular/core";
import { UserModel } from "../../models/user.model";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-profile",
  imports: [],
  templateUrl: "./profile.html",
  styleUrl: "./profile.css",
})
export class Profile {
  protected currentUser = signal<UserModel | null>(null)

  constructor(private router: Router){
    try{
      this.currentUser.set(UserService.getActiveUser() ?? null)
    } catch {
      this.router.navigate(['/login'])
    }
  }
}
