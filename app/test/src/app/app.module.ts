import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { AuthGuard } from './auth.guard';
import { CommonModule } from '@angular/common';
import { CheckComponent } from './check/check.component';
import {TokenServiceService} from './token-service.service';
import { EventsComponent } from './events/events.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotComponent,
    CheckComponent,
    EventsComponent,
  
  ],
  imports: [
   BrowserModule, 
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule
    
  ],
  providers: [AuthService,EventService,AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenServiceService,
      multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
