import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateUserRequest } from '../CreateUserRequest';
import { CafeServiceService } from '../cafe-service.service';
import { SignUpResponse } from '../SignUpResponse';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  username:string = '';
  name:string = '';
  password:string = '';
  confirmpassword:string = '';
  role:string = '';
  createUserRequest:any;

  constructor(private cafeService:CafeServiceService, private _router:Router){

  }

  signUp= new FormGroup({
    username: new FormControl(),
    name: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    role: new FormControl()
  })


  onSignUp(){

    this.username = this.signUp.get('username')?.value;
    this.name = this.signUp.get('name')?.value;
    this.password = this.signUp.get('password')?.value;
    this.confirmpassword = this.signUp.get('confirmPassword')?.value;
    this.role = this.signUp.get('role')?.value;

    if(this.password != this.confirmpassword){
      alert('Passwords Donot Match')
    }

    this.createUserRequest = new CreateUserRequest(this.username,this.name,this.password,this.role);
    this.cafeService.signup(this.createUserRequest).subscribe(response => {
      console.log(response);
    })

    this._router.navigate(['/login']);
  }

}
