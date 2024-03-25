import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CafeServiceService } from '../cafe-service.service';
import { TokenResponse } from '../TokenResponse';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

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
  //
  }


  onLogin(){
    this.cafeService.login(this.login.get('username')!.value,this.login.get('password')!.value,this.login.get('role')!.value).subscribe(response=>{
      localStorage.setItem('authtoken',response.token);
      if(this.login.get('role')!.value == 'CUSTOMER'){
        this._router.navigate(['../menu']);
      }
    });

  }




  




}
