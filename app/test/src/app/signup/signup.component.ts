// import { tokenName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';
import { HttpService } from "./shared/http.service"; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpUserData={

    password:Text,
    passwordConfirm:Text,
    email:Text,
    firstName:Text,
    lastName:Text,
    phoneNumber:Text,


    }
  constructor(private http:HttpService,private router: Router,private _auth:AuthService) { }

  ngOnInit(): void {
    this.startPageOfSignUp()
  }
  startPageOfSignUp(){
    this.signUpUserData.firstName= null
    this.signUpUserData.lastName= null
    this.signUpUserData.password= null
    this.signUpUserData.passwordConfirm= null
    this.signUpUserData.email= null
    this.signUpUserData.phoneNumber= null
  }

  signUpUser(){
    let user=
      {
        Name:(this.signUpUserData.firstName),
        Email:(this.signUpUserData.email)
      }
    
    console.log(user)
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data; 
        console.log(
          ` ${user.Name} is successfully register and mail has been sent and the message id is  
           ${res.messageId}`
        );
      },
      err => {
        console.log(err);
      
      }
    ); 

    this._auth.signUpUser(this.signUpUserData).subscribe((res:any)=> {console.log(res)

      },
      err => console.log(err)
    )
    

  this.router.navigate(['login'])

   }

   }


