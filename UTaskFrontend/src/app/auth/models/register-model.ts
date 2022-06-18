export class RegisterModel {
  DisplayName: string;
  Email: string;
  Password: string;

  constructor(displayName: string, email: string, password: string) {
    this.DisplayName = displayName;
    this.Email = email;
    this.Password = password;
  }
}
