import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {AuthResultModel} from "../../auth/models/AuthResultModel";

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent implements OnInit {

  isLoggedIn = false;
  displayName = "";

  constructor(
    private authService: AuthService
  ) {
    this.isLoggedIn = authService.isLoggedIn;

    authService.AuthStatusChanged.subscribe((authResult: AuthResultModel) => {
      if(this.authService.isLoggedIn) {
        this.isLoggedIn = true;
        this.displayName = authResult.DisplayName;
      }
      else {
        this.isLoggedIn = false;
        this.displayName = "";
      }
    });
  }

  isActive = false;
  title = 'UTaskFrontend';

  showMenu(): void {
    this.isActive = !this.isActive;
  }

  ngOnInit(): void {
  }

}
