import { email } from "@angular/forms/signals";
import { UserModel } from "../models/user.model"

export class UserService {

    static getUsers(): UserModel[] {
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

        return JSON.parse(localStorage.getItem('users')!)
    }

    static findUserByEmail(email: string){
        const users: UserModel[] = this.getUsers()
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


    static signup(payload: UserModel){
        const users: UserModel[] = this.getUsers()
        users.push(payload)
        localStorage.setItem('users', JSON.stringify(users))
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