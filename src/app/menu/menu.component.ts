import { Component, OnInit } from '@angular/core';
import { Menu } from '../Menu';
import { CafeServiceService } from '../cafe-service.service';
import { Observable } from 'rxjs';
import { get } from 'http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Order } from '../Order';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  menu:Menu[] = [];
  orderList:Order[] = [];
  totalOrderPrice:number = 0;
  constructor(private cafeService:CafeServiceService,private router:Router){
  }

  ngOnInit(): void {
    this.getMenu();
    
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
    let order = new Order(menu?.itemKey!,menu?.itemName!,menu?.itemPrice!,quantity,totalPrice);
    this.totalOrderPrice+=totalPrice;
    this.orderList.push(order);
  }

  removeFromCart(index :number){
    let orderAtIndex = this.orderList.at(index);
    let priceTobeDeducted = orderAtIndex?.totalPrice;
    this.orderList.splice(index,1);
    this.totalOrderPrice = this.totalOrderPrice - priceTobeDeducted!;
  }



}






  





