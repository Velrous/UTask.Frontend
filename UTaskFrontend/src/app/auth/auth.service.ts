import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {AuthResultModel} from "./models/AuthResultModel";
import {RegisterModel} from "./models/register-model";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }

  public AuthStatusChanged = new EventEmitter<AuthResultModel | null>();
  private _isLoggedIn = false;
  private _authResult: AuthResultModel | undefined;
  private _authToken: string = "";

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get AuthResultModel() {
    return this._authResult;
  }

  getAuthToken() {
    if(!this._authToken)
    {
      this._authToken = this.cookies.get('Token');
    }
    return this._authToken || null;
  }

  async register(registerModel: RegisterModel): Promise<AuthResultModel | null> {
    let authResult: AuthResultModel | null = null;

    const authRequest = await this.http.post<any>("api/Auth/Register", registerModel).toPromise();

    if(authRequest)
    {
      authResult = new AuthResultModel(
        authRequest.DisplayName,
        authRequest.Token,
        authRequest.ErrorText,
        authRequest.IsSuccess
      );
      this._authResult = authResult;
    }

    this._isLoggedIn = !!authResult;
    this._authToken = authResult?.Token || "";
    this.cookies.set('Token', this._authToken);
    this.AuthStatusChanged.emit(authResult);

    return authResult;
  }

  async logIn(email: string, password: string, isNeedRemember: boolean): Promise<AuthResultModel | null> {
    let authResult: AuthResultModel | null = null;

    const authRequest = await lastValueFrom(this.http.post<any>("api/Auth/Login", {
      email: email,
      password: password,
      isNeedRemember: isNeedRemember
    }));

    if(authRequest)
    {
      authResult = new AuthResultModel(
        authRequest.DisplayName,
        authRequest.Token,
        authRequest.ErrorText,
        authRequest.IsSuccess
      );
      this._authResult = authResult;
    }

    this._isLoggedIn = !!authResult;
    this._authToken = authResult?.Token || "";
    this.cookies.set('Token', this._authToken);
    this.AuthStatusChanged.emit(authResult);

    return authResult;
  }

  async logOut() {
    const promise = await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this._isLoggedIn = false;
        this.AuthStatusChanged.emit(null);
        this.cookies.set('Token', "");
        resolve();
      }, 1000)
    });
  }

  async logInByToken() {
    const token = this.cookies.get('Token');
    if(!token || token == "") {
      return false;
    }

    let authResult: AuthResultModel | null = null;
    const authRequest = await lastValueFrom(this.http.get<any>('api/Auth/LoginByToken'));

    if(authRequest) {
      authResult = new AuthResultModel(
        authRequest.DisplayName,
        authRequest.Token,
        authRequest.ErrorText,
        authRequest.IsSuccess
      );
      this._authResult = authResult;
    }
    if(authResult)
    {
      this._isLoggedIn = true;
    }
    else
    {
      this._isLoggedIn = false;
      this._authToken = "";
      this.cookies.set('Token', this._authToken);
    }
    this.AuthStatusChanged.emit(authResult);

    return true;
  }
}
