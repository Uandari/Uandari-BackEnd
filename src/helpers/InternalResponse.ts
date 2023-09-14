import { StatusCodes } from '../common/enums/enums';
import { BackendCustomException } from '../helpers/ExceptionHelpers';


/* eslint-disable @typescript-eslint/no-explicit-any */
export class InternalResponse {
    public isError: boolean;
    public payload: any;
    public code: number;
    public statusCode: StatusCodes;
    public clientMessage: string;
    public technicalMessage: string;

    constructor() {
        this.isError = false;
        this.payload = {};
        this.code = 200;
        this.statusCode = StatusCodes.OK;
        this.clientMessage = 'Success';
        this.technicalMessage = '';
    }

    setError() {
        this.isError = true;
        this.payload = {};
        this.code = 500;
        this.statusCode = StatusCodes.SERVER_ERROR;
        this.clientMessage = 'Something went wrong';
        this.technicalMessage = '';
    }

    setNotFound() {
        this.isError = false;
        this.payload = {};
        this.code = 404;
        this.statusCode = StatusCodes.NOT_FOUND;
        this.clientMessage = 'Resource not found';
        this.technicalMessage = '';
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    static buildErrorResponse(error: any): InternalResponse {
        const instance = new InternalResponse();
        instance.setError();

        if (error instanceof BackendCustomException) {
            instance.code = error.errorCode;
            instance.statusCode = error.httpStatus;
            instance.technicalMessage = '' + error.originalError;
            instance.clientMessage = error.clientMessage;
        } else {
            instance.technicalMessage = (error as Error).message;
            instance.payload = error;
        }
        return instance;
    }

    static buildNotFoundErrorResponse(error: any): InternalResponse {
        const instance = new InternalResponse();
        instance.setNotFound();
        if (error instanceof BackendCustomException) {
            instance.code = error.errorCode;
            instance.statusCode = error.httpStatus;
            instance.technicalMessage = '' + error.originalError;
            instance.clientMessage = error.clientMessage;
        } else {
            instance.technicalMessage = (error as Error).message;
            instance.payload = error;
        }
        return instance;
    }
}
