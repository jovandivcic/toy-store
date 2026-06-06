import { email } from "@angular/forms/signals";
import { UserModel } from "../models/user.model"

export class UserService {


    static findUserByEmail(email: string){
        if(!localStorage.getItem('users'))
            localStorage.setItem('users', JSON.stringify([
                {
                    fullName: "user userson",
                    email: "user@example.com",
                    phone: "000 000 000",
                    street: "Street 123",
                    favoriteToys: "I like all toys",
                    password: "user123",
                }
        ]))

        const users: UserModel[] = JSON.parse(localStorage.getItem('users')!)
        return users.find(u => u.email === email);
    }


    static login(email: string, password: string){
        const user = this.findUserByEmail(email);

        if(!user){
            alert("User doesn't exist")
            return false
        }

        if(user.password !== password){
            alert("Incorrect password")
            return false
        }

        localStorage.setItem('active', user.email)
        return true
    }


    static getActiveUser(){
        const active = localStorage.getItem('active')

        if(!active)
            throw new Error("USER_NOT_FOUND")
        return this.findUserByEmail(active)
    }

    static logout(){
        localStorage.removeItem('active')
    }
}