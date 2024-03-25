import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from './TokenResponse';
import { LoginRequest } from './LoginRequest';
import { CreateUserRequest } from './CreateUserRequest';
import { SignUpResponse } from './SignUpResponse';
import { Menu } from './Menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class CafeServiceService {



  loginUrl:string;
  signUpUrl:string;
  getMenuUrl:string;
  public loginRequest:any;

  constructor(private http:HttpClient) {
    this.loginUrl = 'http://localhost:9090/login';
    this.signUpUrl = 'http://localhost:9090/signup';
    this.getMenuUrl= 'http://localhost:8080/cafeservice/menu';
   }


   login(userName:string,password:string,role:string):Observable<TokenResponse>{
    this.loginRequest= new LoginRequest(userName,password,role);
    return this.http.post<TokenResponse>(`${this.loginUrl}`,this.loginRequest);
   }

   signup(createUserRequest:CreateUserRequest){
    return this.http.post<SignUpResponse>(`${this.signUpUrl}`,createUserRequest);
   }

   getMenu(){
    let token = localStorage.getItem("authtoken")!;
    let httpHeaders = new HttpHeaders({["authtoken"]:token});
    return this.http.get<Menu[]>(`${this.getMenuUrl}`,{headers:httpHeaders});
   }
}
