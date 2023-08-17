import { StatusCodes } from "../common/enums/enums";

type ApiError = {
  error: Error;
  message: string;
  name: string;
};
export class BackendCustomException extends Error {
  public originalError: unknown;
  public errorCode: number;
  public httpStatus: StatusCodes;
  public clientMessage: string;
  public internalMessage: string;

  constructor(msg = "", originalError: Error = new Error()) {
    super(msg);
    this.originalError = originalError;
    this.errorCode = 500;
    this.httpStatus = StatusCodes.SERVER_ERROR;
    this.clientMessage = "Somenthing went wrong";
    this.internalMessage = msg;
  }
  static transformErrorToException(error: unknown): ApiError {
    const err = error as Error;
    return {
      error: err,
      message: err.message,
      name: err.name,
    };
  }
}

//Data Base Error
export class OracleDatabaseConnectionError extends BackendCustomException {
  constructor(
    msg = "",
    originalError: Error = new Error(),
    clientMessage = "Error connecting database "
  ) {
    super(msg, originalError);
    this.errorCode = 503.1;
    this.httpStatus = StatusCodes.SERVER_ERROR;
    this.clientMessage = clientMessage;
    this.internalMessage = msg;
  }
}
