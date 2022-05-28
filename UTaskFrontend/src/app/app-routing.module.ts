import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {NotesComponent} from "./components/notes/notes.component";
import {GoalsComponent} from "./components/goals/goals.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {TasksComponent} from "./components/tasks/tasks.component";
import {PlanningComponent} from "./components/planning/planning.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {LoginComponent} from "./auth/components/login/login.component";
import {RegisterComponent} from "./auth/components/register/register.component";
import {AuthGuard} from "./auth/auth.guard";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard]},
      { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
      { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'notes', component: NotesComponent, canActivate: [AuthGuard] },
      { path: 'planning', component: PlanningComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
      { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
    ], { relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
