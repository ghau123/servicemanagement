import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginUserData={

password:"",
email:""
}
  constructor(private router: Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.startPageOfLogin()
  }
  startPageOfLogin(){
    this.loginUserData.email= null
    this.loginUserData.password= null
  }
  signUp(){
    console.log("Function Works.............")
    this.router.navigateByUrl("signup")
  }
  loginUser(){
    
   
   this.auth.loginUser(this.loginUserData).subscribe((res:any)=>
    {console.log(res)
      
       localStorage.setItem('token', res.token);
       if(this.loginUserData.email=="gautham@gmail.com" && this.loginUserData.password=="hns"){
        this.router.navigate(['\check'])
       }else{
        this.router.navigate(['\events'])
       }
  
    
  },
     err => console.log(err)
   )

  }

   
}
 