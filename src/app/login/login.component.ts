import { Component, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CafeServiceService } from '../cafe-service.service';
import { TokenResponse } from '../TokenResponse';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../app.routes';
import { Subject } from 'rxjs';

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


  role:string = '';

  ngOnInit(): void {
    let token = localStorage!?.getItem('authtoken');
    if(token!=null){
      this.role = this.cafeService.getRole();
      if(this.role!=null  && this.role !=''){
      let route = this.role == 'CUSTOMER' ? '../menu' : ((this.role == 'ADMIN') ||(this.role == 'EMPLOYEE')  ? '../employee' : '') ;
      this._router.navigate([route]);
      }
    }
  }


  onLogin(){
    this.cafeService.login(this.login.get('username')!.value,this.login.get('password')!.value,this.login.get('role')!.value).subscribe(response=>{
      localStorage?.setItem('authtoken',response.token);
      this.role = this.cafeService.getRole();
      let route = '';
      if(this.role == 'CUSTOMER'){
        route = '../menu';
      }
      else if(this.role == 'ADMIN' || this.role == 'EMPLOYEE'){
        route = '../employee';
      }
      if(route !== ''){
      this._router.navigate([route]);
      }
    });

  }



  




}
