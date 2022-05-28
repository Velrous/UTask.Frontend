import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './components/logout/logout.component';
import {LoginComponent} from "./components/login/login.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthService} from "./auth.service";
import {FormsModule} from "@angular/forms";
import {RegisterComponent} from "./components/register/register.component";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
