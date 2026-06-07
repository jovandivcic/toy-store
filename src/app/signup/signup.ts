import { Component, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { MainService } from "../../services/main.service";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-signup",
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: "./signup.html",
  styleUrl: "./signup.css",
})
export class Signup {
  protected form: FormGroup
  protected favoriteToys = signal<String[]>([])

  constructor(private formBuilder: FormBuilder, protected router: Router) {
    MainService.getFavoriteToys()
      .then(rsp => this.favoriteToys.set(rsp.data))

    this.form =this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      favoriteToys: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
      if(!this.form.valid){
        alert('Incorrect form data')
        return
      }
  
      try{
        UserService.signup(this.form.value)
        this.router.navigate(['/login'])
      } catch(e){
        alert("Incorrect sign-up data")
      }
    }
}
