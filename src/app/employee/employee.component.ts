import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CafeServiceService } from '../cafe-service.service';
import { Menu } from '../Menu';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  menu:Menu[] = [];

  constructor(private cafeService: CafeServiceService){
    
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

  deleteFromMenu(index:number){
    let itemTobeDeleted = this.menu.at(index);
    let itemKey = itemTobeDeleted?.itemKey;
    this.cafeService.removeFromMenu(itemKey!);
  }


}