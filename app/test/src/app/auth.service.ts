import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private checkUrl = "http://localhost:3000/api/check"
  private listUserUrl = "http://localhost:3000/api/listUser"
 
  private _loginUrl = "http://localhost:3000/api/login"
  private _signUpUrl = "http://localhost:3000/api/signUp"
  constructor( private http: HttpClient, private router: Router) { }


  signUpUser(user) {

    return this.http.post(this._signUpUrl, user)
  }

  loginUser(user) {

    return this.http.post(this._loginUrl, user)


  }

  listUser() {
    return this.http.get<any>(this.listUserUrl)
  }

  check() {
    return this.http.get<any>(this.checkUrl)
  }




  loggedIn() {
    return !!localStorage.getItem('token')

  }



  logOutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])

  }

  getToken() {
    return localStorage.getItem('token')
  }
}
