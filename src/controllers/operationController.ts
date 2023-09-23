import { StatusCodes } from '../common/enums/enums';
import { Response, Request } from 'express'
import { getOperationOracle } from '../data/operation-data'

//Get All Operations from Oracle
const getAllOperations = async (_req: Request, res: Response) => {
    try {
        const operations = await getOperationOracle();
        res.status(operations.statusCode).json({
            status: operations.statusCode,
            message: operations.message,
            payload: operations.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
}
export {
    getAllOperations
}