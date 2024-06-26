import { ChangeDetectorRef, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { TokenResponse } from './TokenResponse';
import { LoginRequest } from './LoginRequest';
import { CreateUserRequest } from './CreateUserRequest';
import { SignUpResponse } from './SignUpResponse';
import { Menu } from './Menu';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { tick } from '@angular/core/testing';
import { TokenValidationResponse } from './TokenValidationResponse';
import { Cart } from './Cart';
import { Order } from './Order';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root'
})
export class CafeServiceService{



  loginUrl:string;
  signUpUrl:string;
  getMenuUrl:string;
  validateTokenUrl:string;
  removeFromMenuUrl:string;
  updateMenuUrl:string;
  addItemToMenuUrl:string;
  getOrdersUrl:string;
  placeOrderUrl:string;
  updateOrderStatusUrl:string;
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
    this.getOrdersUrl = 'http://localhost:8080/cafeservice/order';
    this.placeOrderUrl = 'http://localhost:8080/cafeservice/order';
    this.updateOrderStatusUrl = 'http://localhost:8080/cafeservice/order/';
   }


   login(userName:string,password:string,role:string):Observable<TokenResponse>{
    this.loginRequest= new LoginRequest(userName,password,role);
    let response = this.http.post<TokenResponse>(`${this.loginUrl}`,this.loginRequest).pipe(
      catchError(this.handleHttpErrors)
    );
    response.subscribe(data => {
      localStorage.setItem('role',data.userRole);
    })
    return response
   }

   signup(createUserRequest:CreateUserRequest){
    return this.http.post<SignUpResponse>(`${this.signUpUrl}`,createUserRequest).pipe(catchError(this.handleHttpErrors));
   }

   getMenu(){
    let httpHeaders = this.getHttpHeaders();
    return this.http.get<Menu[]>(`${this.getMenuUrl}`,{headers:httpHeaders}).pipe(
      catchError(this.handleHttpErrors)
    );
   }


   validateToken(token:string):Observable<TokenValidationResponse>{
    let httpHeaders = this.getHttpHeaders();
    let status = '';
   return this.http.get<TokenValidationResponse>(`${this.validateTokenUrl}`,{headers:httpHeaders}).pipe(catchError(this.handleHttpErrors));
   }

   logout(){
    localStorage?.clear();
   }

   removeFromMenu(itemKey: number){
    let httpHeaders = this.getHttpHeaders();
    let params = new HttpParams();
    params.append('itemkey',itemKey);
    let api = this.removeFromMenuUrl + '?itemkey=' + JSON.stringify(itemKey);
    this.http.delete(api,{headers:httpHeaders,params:params}).pipe(
      catchError(this.handleHttpErrors)
    ).subscribe(data=>
      {
        console.log(data);
      });
   }

   updateItemInMenu(itemList:Menu[]){
    let httpHeaders = this.getHttpHeaders();
    this.http.put(this.updateMenuUrl,itemList,{headers:httpHeaders}).pipe(catchError(this.handleHttpErrors)).subscribe(data => {
      console.log('Updated Menu : ' + data);
    });
   }

   addItemToMenu(itemList:Menu[]){
    let httpHeaders = this.getHttpHeaders();
    this.http.post(this.addItemToMenuUrl,itemList,{headers:httpHeaders}).pipe(catchError(this.handleHttpErrors)).subscribe(data =>
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

   getUserName():string{
    return localStorage?.getItem('userName')!;
   }


   getOrders(){
     let httpHeaders =this.getHttpHeaders();
     return this.http.get<Order[]>(this.getOrdersUrl,{headers:httpHeaders}).pipe(catchError(this.handleHttpErrors));
   }

   placeOrder(order:Order){
    let httpHeaders = this.getHttpHeaders();
    return this.http.post<Order[]>(this.placeOrderUrl,order,{headers:httpHeaders}).pipe(catchError(this.handleHttpErrors));
   }

   updateOrderStatus(orderId:string,orderStatus:string){
    let headers = this.getHttpHeaders();
    let httpParams = new HttpParams();
    let requestUrl = this.updateOrderStatusUrl  + orderId + '?orderStatus=' + orderStatus;
    httpParams.append('orderId',orderId);
    httpParams.append('orderStatus',orderStatus);
    return this.http.put(requestUrl,null,{headers:headers}).pipe(catchError(this.handleHttpErrors));
   }


   handleHttpErrors(error:HttpErrorResponse){
    alert(error.error.errorMessage);
    return throwError(() => new Error('Something went wrong'));
   }
}
