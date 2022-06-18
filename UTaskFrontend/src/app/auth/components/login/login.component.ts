import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {AuthResultModel} from "../../models/AuthResultModel";
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isLoading = false;
  hasError = false;
  authModel = {
    email: "",
    password: "",
    isNeedRemember: false
  };

  async logIn() {
    this.isLoading = true;
    let authResult: AuthResultModel | null = null;
    try {
      authResult = await this.authService.logIn(this.authModel.email, this.authModel.password, this.authModel.isNeedRemember);
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
    }, 10);
  }

  async ngOnInit(): Promise<void> {
    if(this.authService.isLoggedIn) {
      await this.router.navigate(['/']);
    }
  }

}
