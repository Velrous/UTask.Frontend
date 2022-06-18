import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  async getUser(): Promise<User> {
    return await lastValueFrom(this.http.get<User>(`api/Users`));
  }

  async updateUser(user: User): Promise<void> {
    await lastValueFrom(this.http.put(`api/Users`, user));
  }
}
