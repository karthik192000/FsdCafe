import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    {
        component:HomeComponent,
        path:'home'
    },
    {

    component:LoginComponent,
    path:'login'
},{
    component: SignupComponent,
    path:'signup'
},
{
    component:MenuComponent,
    path:'menu'
},
{
    path:'**',
    redirectTo:'home'
},
];
