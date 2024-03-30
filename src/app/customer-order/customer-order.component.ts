import { Component, OnInit } from '@angular/core';
import { CafeServiceService } from '../cafe-service.service';

@Component({
  selector: 'app-customer-order',
  standalone: true,
  imports: [],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.css'
})
export class CustomerOrderComponent implements OnInit{



  ngOnInit(): void {

  }

  constructor(private cafeService: CafeServiceService){
    
  }

}
