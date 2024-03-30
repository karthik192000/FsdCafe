import { Component, OnInit } from '@angular/core';
import { Order } from '../Order';
import { CafeServiceService } from '../cafe-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-process-order',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './process-order.component.html',
  styleUrl: './process-order.component.css'
})
export class ProcessOrderComponent implements OnInit{



  orderList:Order[] = [];

  constructor(private cafeService: CafeServiceService,private router: Router){

  }
  ngOnInit(): void {
    this.cafeService.getOrders().subscribe(allOrders =>{
      this.orderList = allOrders;
    })
  }


  logout(){
    this.cafeService.logout();
    this.router.navigate(['/login']);
  }

  cancelOrder(orderId:string){
    this.cafeService.updateOrderStatus(orderId,'CANCELLED').subscribe(cancelledOrder => {
      console.log(cancelledOrder);
      this.reload();
    });

  }

  completeOrder(orderId:string){
    this.cafeService.updateOrderStatus(orderId,'COMPLETED').subscribe(completedOrder => {
      console.log(completedOrder);
      this.reload();
    });
  }

  reload(){
    window.location.reload();
  }
}
