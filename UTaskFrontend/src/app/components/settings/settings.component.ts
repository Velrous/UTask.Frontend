import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {AuthService} from "../../auth/auth.service";
import {DialogService} from "../../dialogs/dialog.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User = new User(0,"","","","");

  oldPassword = "";
  newPassword = "";
  newConfirmPassword = "";

  constructor(
    private service: UserService,
    private authService: AuthService,
    private dialogService: DialogService
  ) { }

  async getUser(): Promise<void> {
    this.user = await this.service.getUser();
    await this.authService.logInByToken();
  }

  async updateUser(): Promise<void> {
    if(this.user.DisplayName.length > 0) {
      if(this.user.Email.length > 0) {
        if(this.oldPassword.length > 0) {
          if(this.newPassword.length > 0 && this.newPassword === this.newConfirmPassword) {
            this.user.OldPassword = this.oldPassword;
            this.user.NewPassword = this.newPassword;
          }
          else {
            this.dialogService.openErrorDialog("Не введён новый пароль или он не совпадает с подтверждением");
          }
        }
        await this.service.updateUser(this.user);
        this.oldPassword = "";
        this.newPassword = "";
        this.newConfirmPassword = "";
        await this.getUser();
      }
      else {
        this.dialogService.openErrorDialog("Пустая электронная почта");
      }
    }
    else {
      this.dialogService.openErrorDialog("Пустое имя пользователя");
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getUser();
  }
}
