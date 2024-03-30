import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenResponse } from './TokenResponse';
import { LoginRequest } from './LoginRequest';
import { CreateUserRequest } from './CreateUserRequest';
import { SignUpResponse } from './SignUpResponse';
import { Menu } from './Menu';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tick } from '@angular/core/testing';
import { TokenValidationResponse } from './TokenValidationResponse';
import { Cart } from './Cart';

@Injectable({
  providedIn: 'root'
})
export class CafeServiceService {



  loginUrl:string;
  signUpUrl:string;
  getMenuUrl:string;
  validateTokenUrl:string;
  removeFromMenuUrl:string;
  updateMenuUrl:string;
  addItemToMenuUrl:string;
  public loginRequest:any;

  cartMap:Map<number,Cart> = new Map();

  private cartMapSharedSubject=  new BehaviorSubject<Map<number,Cart>>(new Map);
  sharedCartMap = this.cartMapSharedSubject.asObservable();

  private totalOrderPriceSubject = new BehaviorSubject<number>(0);
  sharedTotalOrderPrice = this.totalOrderPriceSubject.asObservable();
  totalOrderPrice:number = 0;

  private roleSubject = new BehaviorSubject<string>('');
  sharedRole= this.roleSubject.asObservable();

  constructor(private http:HttpClient) {
    this.loginUrl = 'http://localhost:9090/login';
    this.signUpUrl = 'http://localhost:9090/signup';
    this.getMenuUrl= 'http://localhost:8080/cafeservice/menu';
    this.validateTokenUrl = 'http://localhost:9090/validate';
    this.removeFromMenuUrl =  'http://localhost:8080/cafeservice/menu';
    this.updateMenuUrl = 'http://localhost:8080/cafeservice/menu';
    this.addItemToMenuUrl= 'http://localhost:8080/cafeservice/menu';
   }


   login(userName:string,password:string,role:string):Observable<TokenResponse>{
    this.loginRequest= new LoginRequest(userName,password,role);
    let response = this.http.post<TokenResponse>(`${this.loginUrl}`,this.loginRequest);
    response.subscribe(data => {
      localStorage.setItem('role',data.userRole);
    })
    return response
   }

   signup(createUserRequest:CreateUserRequest){
    return this.http.post<SignUpResponse>(`${this.signUpUrl}`,createUserRequest);
   }

   getMenu(){
    let httpHeaders = this.getHttpHeaders();
    return this.http.get<Menu[]>(`${this.getMenuUrl}`,{headers:httpHeaders});
   }


   validateToken(token:string):Observable<TokenValidationResponse>{
    let httpHeaders = this.getHttpHeaders();
    let status = '';
   return this.http.get<TokenValidationResponse>(`${this.validateTokenUrl}`,{headers:httpHeaders});
   }

   logout(){
    localStorage?.clear();
   }

   removeFromMenu(itemKey: number){
    let httpHeaders = this.getHttpHeaders();
    let params = new HttpParams();
    params.append('itemkey',itemKey);
    let api = this.removeFromMenuUrl + '?itemkey=' + JSON.stringify(itemKey);
    this.http.delete(api,{headers:httpHeaders,params:params}).subscribe(data=>
      {
        console.log(data);
      });
   }

   updateItemInMenu(itemList:Menu[]){
    let httpHeaders = this.getHttpHeaders();
    this.http.put(this.updateMenuUrl,itemList,{headers:httpHeaders}).subscribe(data => {
      console.log('Updated Menu : ' + data);
    });
   }

   addItemToMenu(itemList:Menu[]){
    let httpHeaders = this.getHttpHeaders();
    this.http.post(this.addItemToMenuUrl,itemList,{headers:httpHeaders}).subscribe(data =>
      {
        console.log('Item added');
      });
   }
   getHttpHeaders():HttpHeaders{
    let token = localStorage?.getItem('authtoken')!;
    let httpHeaders = new HttpHeaders({['authtoken']:token});
    return httpHeaders;
   }

   updateCartMap(cartMap:Map<number,Cart>){
    this.cartMapSharedSubject.next(cartMap);
   }

   updateTotalOrderPrice(totalOrderPrice:number){
    this.totalOrderPriceSubject.next(totalOrderPrice);
   }

   getRole():string{
    return localStorage?.getItem('role')!;
   }
}
