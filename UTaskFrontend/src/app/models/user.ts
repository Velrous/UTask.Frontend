export class User {
  Id: number;
  DisplayName: string;
  Email: string;
  OldPassword: string;
  NewPassword: string;

  constructor(id: number, displayName: string, email: string, oldPassword: string, newPassword: string) {
    this.Id = id;
    this.DisplayName = displayName;
    this.Email = email;
    this.OldPassword = oldPassword;
    this.NewPassword = newPassword;
  }
}
