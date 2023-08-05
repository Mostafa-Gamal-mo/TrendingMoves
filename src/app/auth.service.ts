import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient , private _Router:Router) { 
    if(localStorage.getItem('userToken')!==null){
      this.decodeUserData();
    }

   }

  register(userData:object):Observable<any>
  {
    return this._HttpClient.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', userData)

  }
  login(userData:object):Observable<any>
  {
    return this._HttpClient.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', userData)

  }

  userData = new BehaviorSubject(null);
  decodeUserData(){
    let incodedToken=JSON.stringify(localStorage.getItem('userToken'))
    let decodedToken:any= jwtDecode(incodedToken)
    this.userData.next(decodedToken)
    console.log(this.userData);
  }

singOut(){
  localStorage.removeItem('userToken')
  this.userData.next(null) 
  this._Router.navigate(['/login'])
}



}
