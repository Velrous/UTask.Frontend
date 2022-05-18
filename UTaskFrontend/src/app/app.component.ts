import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isShowNavbar = false;
  isActive = false;
  title = 'UTaskFrontend';

  showNavbar(): void {
    this.isShowNavbar = !this.isShowNavbar;
  }

  showMenu(): void {
    this.isActive = !this.isActive;
  }
}
