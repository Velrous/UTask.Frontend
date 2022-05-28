import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {AuthResultModel} from "../../models/AuthResultModel";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isLoading = false;
  hasError = false;
  authModel = {
    login: "",
    password: ""
  };

  async logIn() {
    console.log("authModel", this.authModel);
    this.isLoading = true;
    let authResult: AuthResultModel | null = null;
    try {
      authResult = await this.authService.logIn(this.authModel.login, this.authModel.password);
      this.isLoading = false;
    }
    catch (e) {
      console.error(e);
      this.hasError = true;
      this.isLoading = false;
      return;
    }

    setTimeout(() => {
      if(authResult) {
        this.router.navigate(['./planning'])
      }
    }, 10); //TODO разобраться зачем нужно?
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn) {
      this.router.navigate(['/']); //TODO разобраться что не нравится
    }
  }

}
