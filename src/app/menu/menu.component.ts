import { Component, EventEmitter, OnInit } from '@angular/core';
import { Menu } from '../Menu';
import { CafeServiceService } from '../cafe-service.service';
import { Observable } from 'rxjs';
import { get } from 'http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Order } from '../Order';
import { CustomerOrderComponent } from '../customer-order/customer-order.component';
import { Cart } from '../Cart';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule,CustomerOrderComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  menu:Menu[] = [];
  orderList:Order[] = [];
  totalOrderPrice:number = 0;
  cartMap:Map<number,Cart> = new Map;
  role:string='';
  constructor(private cafeService:CafeServiceService,private router:Router){
  }


  ngOnInit(): void {
    this.role = this.cafeService.getRole();
    if(this.role == '' || this.role == null){
      this.logout();
    }
    else if(this.role != 'CUSTOMER'){
      this.router.navigate(['/employee'])
    }
    this.getMenu();
    this.cafeService.sharedCartMap.subscribe(sharedCartMap => {
      this.cartMap = sharedCartMap;
    })
    this.cafeService.sharedTotalOrderPrice.subscribe(sharedTotalOrderPrice =>{
      this.totalOrderPrice = sharedTotalOrderPrice;
    })
    
  }

  getMenu(){
    // this.validateToken();
    this.cafeService.getMenu().subscribe(data =>{
      this.menu = data;
    })
  }  


  logout(){
    this.cafeService.logout();
    this.router.navigate(['../login']);
  }


  validateToken(){
    let token = localStorage.getItem('authtoken');
    let status = '';
    this.cafeService.validateToken(token!).subscribe(data =>{
      status = data.status;
      if(status == 'EXPIRED'){
        alert('Your session has expired, please login again');
        this.logout();
      }
      else if(status = 'INVALID'){
        alert('You are not authorized');
        this.logout();
      }

    })

  }


  addToCart(index:number,quantityString:string){
    let quantity = parseInt(quantityString);
    let menu = this.menu.at(index);
    let totalPrice = menu?.itemPrice! * quantity;
  
    let cartItem = this.cartMap.get(menu?.itemKey!);
    if(cartItem != null){
      let totalQuantityIncart = cartItem.quantity;
      let totalPriceIncart = cartItem.totalPrice;
      totalPriceIncart += totalPrice;
      totalQuantityIncart+= quantity;
      cartItem.totalPrice = totalPriceIncart;
      cartItem.quantity =totalQuantityIncart;
    }
    else{
    cartItem = new Cart(menu?.itemKey!,menu?.itemName!,menu?.itemPrice!,quantity,totalPrice);
    }
    this.cartMap.set(menu?.itemKey!,cartItem);
    this.cafeService.updateCartMap(this.cartMap);
    this.totalOrderPrice+=totalPrice;
    this.cafeService.updateTotalOrderPrice(this.totalOrderPrice);
  }



}






  





