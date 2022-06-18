import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgbDateNativeAdapter, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NotesComponent } from './components/notes/notes.component';
import { AppRoutingModule } from './app-routing.module';
import { GoalsComponent } from './components/goals/goals.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TasksComponent } from './components/tasks/tasks.component';
import {FormsModule} from "@angular/forms";
import { PlanningComponent } from './components/planning/planning.component';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import { SettingsComponent } from './components/settings/settings.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {AuthModule} from "./auth/auth.module";
import {AuthRoutingModule} from "./auth/auth-routing.module";
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MainBodyComponent } from './components/main-body/main-body.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogError, DialogFilter, DialogInfo} from "./dialogs/dialog.service";
import {MatDialogModule} from "@angular/material/dialog";
import { NgbDateCustomParserFormatter } from './helpers/NgbDateCustomParserFormatter';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    GoalsComponent,
    CategoriesComponent,
    TasksComponent,
    PlanningComponent,
    SettingsComponent,
    MainMenuComponent,
    MainBodyComponent,
    DialogInfo,
    DialogError,
    DialogFilter
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    AuthModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxMaterialTimepickerModule,
    MatDialogModule
  ],
  exports: [
    MatDialogModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru-RU' },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: NgbDateNativeAdapter, useClass: NgbDateNativeAdapter},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeRu);
  }
}
