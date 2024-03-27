import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CafeServiceService } from '../cafe-service.service';
import { Menu } from '../Menu';
import { FormControl, FormGroup, NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule,ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  menu:Menu[] = [];

  constructor(private cafeService: CafeServiceService, private router:Router){
    
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
    this.reload();
  }

  updateItem(index: number, itemname:string,itempriceString:string,itemCategory:string,vegornonveg:string){
    let itemprice = parseInt(itempriceString);
    let itemToBeUpdated = this.menu.at(index);
    itemToBeUpdated = new Menu(itemToBeUpdated?.itemKey!,itemname,itemCategory,itemprice,vegornonveg);
    let itemList:Menu[] = [];
    itemList.push(itemToBeUpdated);
    this.cafeService.updateItemInMenu(itemList);
    this.reload();
  }

  addItemToMenu(){
    let itemName = this.menuFormGroup.get('itemName')!.value;
    let itemPrice = this.menuFormGroup.get('itemPrice')!.value;
    let itemCategory = this.menuFormGroup.get('itemCategory')!.value;
    let vegOrNonVeg = this.menuFormGroup.get('vegOrNonVeg')!.value;
    let itemList:Menu[] = [];
    let itmeToBeAdded:any = {'itemName':itemName,'itemPrice':itemPrice,'itemCategory':itemCategory,'vegOrNonVeg':vegOrNonVeg};
    itemList.push(itmeToBeAdded);
    this.cafeService.addItemToMenu(itemList);
    this.reload();
  }

  logout(){
    this.cafeService.logout();
    this.router.navigate(['../login']);
  }

  reload(){
    window.location.reload();
  }

  menuFormGroup = new FormGroup({
    itemName:new FormControl(),
    itemPrice:new FormControl(),
    itemCategory: new FormControl(),
    vegOrNonVeg: new FormControl()
  })


}
