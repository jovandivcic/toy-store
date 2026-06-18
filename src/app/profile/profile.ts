import { Component, signal } from "@angular/core";
import { UserModel } from "../../models/user.model";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { MainService } from "../../services/main.service";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-profile",
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: "./profile.html",
  styleUrl: "./profile.css",
})
export class Profile {
  protected currentUser = signal<UserModel | null>(null)
  protected isEditModalOpen = signal<boolean>(false);
  protected favoriteToys = signal<string[]>([]);
  protected profileForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder){
    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      favoriteToys: ['', Validators.required],
      password: ['', Validators.required]
    });

     MainService.getFavoriteToys()
      .then(rsp => this.favoriteToys.set(rsp.data.map(item => item.toString())));

    try {
      const activeUser = UserService.getActiveUser();
      if (!activeUser) {
        throw new Error('No active user');
      }
      this.currentUser.set(activeUser);
      this.fillProfileForm(activeUser);
    } catch {
      this.router.navigate(['/login'])
    }
  }

  private fillProfileForm(user: UserModel) {
    this.profileForm.setValue({
      fullName: user.fullName,
      phone: user.phone,
      street: user.street,
      favoriteToys: user.favoriteToys,
      password: user.password
    });
  }

  protected openEditModal() {
    const user = this.currentUser();

    if (!user) {
      return;
    }

    this.fillProfileForm(user);

    this.isEditModalOpen.set(true);
  }

  protected closeEditModal() {
    this.isEditModalOpen.set(false);
  }

  protected saveProfileChanges() {
    if (!this.profileForm.valid) {
      alert("Incorrect profile data");
      return;
    }

    try {
      const updatedUser = UserService.updateActiveUser(this.profileForm.value);

      this.currentUser.set(updatedUser);

      this.closeEditModal();

      alert("Profile information updated successfully");
    } catch {
      alert("Profile information could not be updated");
    }
  }

  protected logout() {
    UserService.logout();

    this.router.navigate(['/login']);
  }


}
