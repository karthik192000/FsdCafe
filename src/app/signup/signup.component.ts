import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CreateUserRequest } from '../CreateUserRequest';
import { CafeServiceService } from '../cafe-service.service';
import { SignUpResponse } from '../SignUpResponse';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ConfirmedValidator } from '../confirmed.validator';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,RouterModule,NgIf],
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

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group!.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    if(pass === confirmPass){
      return null
    }
    else {
      group.get('confirmPassword')?.setErrors({notSame:true});
      return {notSame:true};
    }
  }

  signUp= new FormGroup({
    username: new FormControl('',[Validators.required,Validators.email]),
    name: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.min(7)]),
    confirmPassword: new FormControl('',[Validators.required,Validators.min(7)]),
    role: new FormControl()
  },{
       validators: this.checkPasswords
  }
  );


  onSignUp(){

    this.username = this.signUp.get('username')?.value!;
    this.name = this.signUp.get('name')?.value!;
    this.password = this.signUp.get('password')?.value!;
    this.confirmpassword = this.signUp.get('confirmPassword')?.value!;
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

  get f(){
    return this.signUp.controls;
  }
}
