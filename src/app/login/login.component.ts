import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CafeServiceService } from '../cafe-service.service';
import { TokenResponse } from '../TokenResponse';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  constructor(private cafeService: CafeServiceService,private _router:Router){

  }

  login = new FormGroup({
    username: new FormControl(),
    role: new FormControl(),
    password : new FormControl()
  });


  ngOnInit(): void {
    let token = localStorage!?.getItem('authtoken');
    if(token!=null){
      let role = localStorage?.getItem('role');
      let route = role == 'CUSTOMER' ? '../menu' : ((role == 'ADMIN') ||(role == 'EMPLOYEE')  ? '../employee' : '') ;
      this._router.navigate([route]);
    }
  }


  onLogin(){
    this.cafeService.login(this.login.get('username')!.value,this.login.get('password')!.value,this.login.get('role')!.value).subscribe(response=>{
      localStorage?.setItem('authtoken',response.token);
      localStorage?.setItem('role',this.login.get('role')!.value);
      let role = this.login.get('role')!.value;
      let route = '';
      if(role == 'CUSTOMER'){
        route = '../menu';
      }
      else if(role == 'ADMIN'){
        route = '../employee';
      }
      if(route !== ''){
      this._router.navigate([route]);
      }
    });

  }




  




}
