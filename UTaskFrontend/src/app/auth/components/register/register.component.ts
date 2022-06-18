import { Component, OnInit } from '@angular/core';
import {faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../auth.service";
import {RegisterModel} from "../../models/register-model";
import {Router} from "@angular/router";
import {DialogService} from "../../../dialogs/dialog.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;

  displayName = "";
  email = "";
  password = "";
  confirmPassword = "";

  constructor(
    private service: AuthService,
    private router: Router,
    private dialogService: DialogService
  ) { }

  async register(): Promise<void> {
    if(this.displayName.length > 0) {
      if(this.displayName.length <= 128) {
        if(this.email.length > 0) {
          if(this.email.length <= 64) {
            if(this.password.length >= 6) {
              if(this.password === this.confirmPassword) {
                let registerModel = new RegisterModel(this.displayName, this.email, this.password );
                let authResult = await this.service.register(registerModel);
                if(authResult && authResult.IsSuccess) {
                  await this.router.navigate(['./planning'])
                }
                else {
                  this.dialogService.openErrorDialog("Произошла ошибка при регистрации, попробуйте позже или обратитесь в поддержку");
                }
              }
              else {
                this.dialogService.openErrorDialog("Пароль не совпадает с подтверждением");
              }
            }
            else {
              this.dialogService.openErrorDialog("Пароль не может быть короче 6 символов");
            }
          }
          else {
            this.dialogService.openErrorDialog("Электронная почта имееет недопустимую длину");
          }
        }
        else {
          this.dialogService.openErrorDialog("Не введена электронная почта");
        }
      }
      else {
        this.dialogService.openErrorDialog("Имя пользователя имеет недопустимую длину");
      }
    }
    else {
      this.dialogService.openErrorDialog("Имя пользователя не может быть пустым");
    }
  }

  ngOnInit(): void {
  }
}
