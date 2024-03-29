import { Component, Input, OnInit, Output } from '@angular/core';
import { Cart } from '../Cart';
import { MenuComponent } from '../menu/menu.component';
import { CafeServiceService } from '../cafe-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MenuComponent,CommonModule,RouterModule,RouterOutlet],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{


  cartMap: Map<number,Cart> = new Map;
  totalOrderPrice:number = 0;
  constructor(private cafeService:CafeServiceService, private _router: Router){

  }
  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if(role != 'CUSTOMER'){
      this._router.navigate(['/home']);
    }
    this.cafeService.sharedCartMap.subscribe(sharedCartMap =>{
      this.cartMap = sharedCartMap;
    })
    this.cafeService.sharedTotalOrderPrice.subscribe(sharedTotalOrderPrice=>{
      this.totalOrderPrice = sharedTotalOrderPrice;
    })
  }


  removeFromCart(itemKey:number){
    let totalPrice = this.cartMap.get(itemKey)?.totalPrice!;
    this.totalOrderPrice -= totalPrice;
    this.cartMap.delete(itemKey);
    this.cafeService.updateCartMap(this.cartMap);
    this.cafeService.updateTotalOrderPrice(this.totalOrderPrice);
  }

  logout(){
    this.cafeService.logout();
    this._router.navigate(['/login'])
  }
}
