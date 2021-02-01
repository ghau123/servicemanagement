import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private _auth: AuthService,private router: Router) { }

  ngOnInit(): void {
  }
  logOutUser() {
    this._auth.logOutUser()
    this.router.navigate(['login'])
  }

}
