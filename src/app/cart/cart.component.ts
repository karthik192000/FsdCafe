import { ChangeDetectorRef, Component, Input, NgZone, OnInit, Output } from '@angular/core';
import { Cart } from '../Cart';
import { MenuComponent } from '../menu/menu.component';
import { CafeServiceService } from '../cafe-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Order } from '../Order';
import { OrderItem } from '../OrderItem';

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
  role:string = '';
  placeOrderDisabled:boolean = true;
  cartItem:[number,Cart][] = [];
  constructor(private cafeService:CafeServiceService, private _router: Router,private changeDetector:ChangeDetectorRef){

  }
  ngOnInit(): void {
    this.role = this.cafeService.getRole();
    if(this.role != 'CUSTOMER'){
      this._router.navigate(['/home']);
    }
    this.cafeService.sharedCartMap.subscribe(sharedCartMap =>{
      this.cartMap = sharedCartMap;
    })
    this.cafeService.sharedTotalOrderPrice.subscribe(sharedTotalOrderPrice=>{
      this.totalOrderPrice = sharedTotalOrderPrice;
    })
    this.changeDetector.detectChanges();
    this.placeOrderDisabled = this.cartMap.size == 0;
  }


  removeFromCart(itemKey:number){
    let totalPrice = this.cartMap.get(itemKey)?.totalPrice!;
    this.totalOrderPrice -= totalPrice;
    this.cartMap.delete(itemKey);
    this.changeDetector.detectChanges();
    this.cafeService.updateCartMap(this.cartMap);
    this.cafeService.updateTotalOrderPrice(this.totalOrderPrice);
  }

  logout(){
    this.cafeService.logout();
    this._router.navigate(['/login'])
  }

  placeOrder(){
   let orderItemList:OrderItem[] = [];

   this.cartItem = Array.from(this.cartMap.entries());

   this.cartItem.forEach(([itemKey,item])=>{
    let itemName = item.itemName;
    let itemPrice = item.itemPrice;
    let quantity = item.quantity;
    let totalPrice = item.totalPrice;
    let orderItem = new OrderItem(itemName,itemPrice,quantity,totalPrice);
    orderItemList.push(orderItem);
   });

   let order:Order = new Order(orderItemList,this.totalOrderPrice,'INPROGRESS');
   this.cafeService.placeOrder(order).subscribe(savedOrder =>{
    console.log(savedOrder);
   } );

  }

}
