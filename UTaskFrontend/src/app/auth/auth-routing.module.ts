import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {LogoutComponent} from "./components/logout/logout.component";

const routes: Routes = [{
  path: 'Login',
  pathMatch: 'full',
  component: LoginComponent
}, {
  path: 'Logout',
  pathMatch: 'full',
  component: LogoutComponent
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
