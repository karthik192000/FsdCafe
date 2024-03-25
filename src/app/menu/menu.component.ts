import { Component, OnInit } from '@angular/core';
import { Menu } from '../Menu';
import { CafeServiceService } from '../cafe-service.service';
import { Observable } from 'rxjs';
import { get } from 'http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  menu:Menu[] = [];

  constructor(private cafeService:CafeServiceService,private router:Router){
  }

  ngOnInit(): void {
    this.getMenu();
    
  }

  getMenu(){
    this.cafeService.getMenu().subscribe(data =>{
      this.menu = data;
    })
  }  


  logout(){
    localStorage.removeItem('authtoken');
    this.router.navigate(['../login']);
  }



}






  





