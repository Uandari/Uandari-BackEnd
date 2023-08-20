export class LoginUser {
  controlNumber: string;
  password: string;

  constructor(controlNumber: string, password: string) {
    this.controlNumber = controlNumber;
    this.password = password;
  }
}
