import { Component, OnInit } from '@angular/core';
import { CafeServiceService } from '../cafe-service.service';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-customer-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.css'
})
export class CustomerOrderComponent implements OnInit{



  ngOnInit(): void {

  }

  constructor(private cafeService: CafeServiceService){

  }

}
