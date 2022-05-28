import {BaseResult} from "../../models/base-result";

export class AuthResultModel extends BaseResult {
  DisplayName: string;
  Token: string;

  constructor(displayName: string, token: string, errorText: string, isSuccess: boolean) {
    super(errorText, isSuccess);
    this.DisplayName = displayName;
    this.Token = token;
  }
}
