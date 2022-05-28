import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {AuthResultModel} from "../../auth/models/AuthResultModel";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  isMenuHidden = false;
  displayName = "";

  constructor(
    private authService: AuthService
  ) {
    this.isMenuHidden = !authService.isLoggedIn;

    authService.AuthStatusChanged.subscribe((authResult: AuthResultModel) => {
      if(this.authService.isLoggedIn) {
        this.isMenuHidden = false;
        this.displayName = authResult.DisplayName;
      }
      else {
        this.isMenuHidden = true;
        this.displayName = "";
      }
    });
  }


  isShowNavbar = false;
  isActive = false;
  title = 'UTaskFrontend';

  showNavbar(): void {
    this.isShowNavbar = !this.isShowNavbar;
  }

  ngOnInit(): void {
  }

}
