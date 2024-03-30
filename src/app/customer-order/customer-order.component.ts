import { Component, OnInit } from '@angular/core';
import { CafeServiceService } from '../cafe-service.service';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Order } from '../Order';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-order',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.css'
})
export class CustomerOrderComponent implements OnInit{


  orderList:Order[] = [];
  ngOnInit(): void {
    this.cafeService.getOrders().subscribe(orders =>{
      this.orderList = orders;
    })
  }

  constructor(private cafeService: CafeServiceService,private router:Router){

  }


  logout(){
    this.cafeService.logout();
    this.router.navigate(['/login']);

  }

}
