import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    if(this.authService.isLoggedIn) {
      return true;
    }
    else {
      let logged = null;
      try {
        logged = await this.authService.logInByToken();
      } catch (e) {
        console.error(e);
      }
      if(logged) {
        return true;
      }
    }

    await this.router.navigate(['/Login']);
    return false;
  }

  async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    if(this.authService.isLoggedIn) {
      return true; //TODO Почитать, как правильно, а то пока выглядит как дубликат кода выше
    }
    else {
      let logged = null;
      try {
        logged = await this.authService.logInByToken();
      } catch (e) {
        console.error(e);
      }
      if(logged) {
        return true;
      }
    }

    await this.router.navigate(['/Login']);
    return false;
  }
}
