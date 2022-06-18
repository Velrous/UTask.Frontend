import { Component, OnInit } from '@angular/core';
import {faArrowRightFromBracket, faBarsProgress, faBookmark, faCalendar,
  faCalendarCheck, faCircleQuestion, faGear, faListCheck, faNoteSticky, faXmark } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../auth/auth.service";
import {AuthResultModel} from "../../auth/models/AuthResultModel";
import {DialogService} from "../../dialogs/dialog.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  faGear = faGear;
  faCalendar = faCalendar;
  faCircleQuestion = faCircleQuestion;
  faListCheck = faListCheck;
  faNoteSticky = faNoteSticky;
  faBarsProgress = faBarsProgress;
  faBookmark = faBookmark;
  faCalendarCheck = faCalendarCheck;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faXmark = faXmark;

  isMenuHidden = false;
  displayName = "";

  constructor(
    private authService: AuthService,
    private dialogService: DialogService
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

  async openAboutProgram() {
    this.dialogService.openInfoDialog("Информационная система для повышения личной эффективности, организации задач и развития навыков планирования - UTask." + '\n' +
      "Разработчик: Коровкин Павел Александрович. Студент группы ПИН-Б-0-Д-2018-1.");
  }

  ngOnInit(): void {
  }

}
