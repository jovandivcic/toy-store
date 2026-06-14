import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Details } from './details/details';
import { Cart } from './cart/cart';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'signup', component: Signup},
    {path: 'login', component: Login},
    {path: 'profile', component: Profile},
    {path: 'details/:id', component: Details},
    {path: 'cart', component: Cart}
];
