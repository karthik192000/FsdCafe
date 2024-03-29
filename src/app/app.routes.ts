import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { EmployeeComponent } from './employee/employee.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { CartComponent } from './cart/cart.component';

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
    component: EmployeeComponent,
    path:'employee'
},
{
    component:CustomerOrderComponent,
    path:'myorders'
},
{
    component: CartComponent,
    path:'mycart'
},
{
    path:'**',
    redirectTo:'home'
},
];
