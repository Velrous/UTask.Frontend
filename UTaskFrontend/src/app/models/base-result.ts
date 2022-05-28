export class BaseResult {
  ErrorText: string;
  IsSuccess: boolean;

  constructor(errorText: string, isSuccess: boolean) {
    this.ErrorText = errorText;
    this.IsSuccess = isSuccess;
  }
}
