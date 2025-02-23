import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any = null ; 

  basUrl:string = 'https://ecommerce.routemisr.com';  

  constructor(private httpClient:HttpClient) { }  ; 
  private readonly router = inject(Router); 

  sendRegisterForm(data:object):Observable<any>
  {
    return this.httpClient.post(`${this.basUrl}/api/v1/auth/signup` , data );
  };
  sendLoginForm(data:object):Observable<any>
  {
    return this.httpClient.post(`${this.basUrl}/api/v1/auth/signin` , data );
  };
  
  saveUserData():void
  {
   if(localStorage.getItem('userToken') !== null){
    this.userData =  jwtDecode( localStorage.getItem('userToken') ! );
    console.log(this.userData , 'userdata'); 
    
   }

  };

  logoutUser():void
  {
     localStorage.removeItem('userToken'); 

     this.userData = null;  

     this.router.navigate(['/login']); 
  };

  setEmailVerify(data:object):Observable<any>
  {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords' , data )
  };

  setCodeVerify(data:object):Observable<any>
  {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , data )
  };
  setResetPass(data:object):Observable<any>
  {
    return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , data )
  };

}
