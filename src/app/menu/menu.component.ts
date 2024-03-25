import { Component, OnInit } from '@angular/core';
import { Menu } from '../Menu';
import { CafeServiceService } from '../cafe-service.service';
import { Observable } from 'rxjs';
import { get } from 'http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  menu:Menu[] = [];

  constructor(private cafeService:CafeServiceService){
  }

  ngOnInit(): void {
    this.getMenu();
    
  }

  getMenu(){
    this.cafeService.getMenu().subscribe(data =>{
      this.menu = data;
    })
  }  




}






  





