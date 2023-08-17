export class ResultVW {
  message: string;
  statusCode: number;
  vw?: any;
  constructor(message: string, statusCode: number, vw?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.vw = vw;
  }
}
