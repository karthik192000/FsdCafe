import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from './TokenResponse';
import { LoginRequest } from './LoginRequest';
import { CreateUserRequest } from './CreateUserRequest';
import { SignUpResponse } from './SignUpResponse';
import { Menu } from './Menu';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tick } from '@angular/core/testing';
import { TokenValidationResponse } from './TokenValidationResponse';

@Injectable({
  providedIn: 'root'
})
export class CafeServiceService {



  loginUrl:string;
  signUpUrl:string;
  getMenuUrl:string;
  validateTokenUrl:string;
  removeFromMenuUrl:string;
  public loginRequest:any;

  constructor(private http:HttpClient) {
    this.loginUrl = 'http://localhost:9090/login';
    this.signUpUrl = 'http://localhost:9090/signup';
    this.getMenuUrl= 'http://localhost:8080/cafeservice/menu';
    this.validateTokenUrl = 'http://localhost:9090/validate';
    this.removeFromMenuUrl =  'http://localhost:8080/cafeservice/menu';
   }


   login(userName:string,password:string,role:string):Observable<TokenResponse>{
    this.loginRequest= new LoginRequest(userName,password,role);
    return this.http.post<TokenResponse>(`${this.loginUrl}`,this.loginRequest);
   }

   signup(createUserRequest:CreateUserRequest){
    return this.http.post<SignUpResponse>(`${this.signUpUrl}`,createUserRequest);
   }

   getMenu(){
    let token = localStorage?.getItem("authtoken")!;
    let httpHeaders = new HttpHeaders({["authtoken"]:token});
    return this.http.get<Menu[]>(`${this.getMenuUrl}`,{headers:httpHeaders});
   }


   validateToken(token:string):Observable<TokenValidationResponse>{
    let httpHeaders = new HttpHeaders({['authtoken']:token});
    let status = '';
   return this.http.get<TokenValidationResponse>(`${this.validateTokenUrl}`,{headers:httpHeaders});
   }

   logout(){
    localStorage?.clear();
   }

   removeFromMenu(itemKey: number){
    let token = localStorage?.getItem('authtoken')!;
    let httpHeaders = new HttpHeaders({['authtoken']:token});
    let params = new HttpParams();
    params.append('itemkey',itemKey);
    let api = this.removeFromMenuUrl + '?itemkey=' + JSON.stringify(itemKey);
    this.http.delete(api,{headers:httpHeaders,params:params}).subscribe(data=>
      {
        console.log(data);
      });
    window.location.reload();  
   }
}
