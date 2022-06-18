import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    await this.authService.logOut();
    await this.router.navigate(['/Login']);
    document.location.reload();
  }

}
