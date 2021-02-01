import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
userData=[]
check=[]

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {

    this._auth.check().subscribe(res =>{

      this.check= res;
      err =>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            localStorage.removeItem('token')
            this._router.navigate(['login'])
          }
        }
      }
      
    })




    this._auth.listUser().subscribe(res =>{
    
      this.userData = res,
      console.log( "check compoenet")
      console.log( this.userData)
 

      err =>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['login'])
          }
        }
      }
    })

    
  }



  logOutUser() {
    this._auth.logOutUser()
  }

}

