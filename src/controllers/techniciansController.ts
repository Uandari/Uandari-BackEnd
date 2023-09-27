import { StatusCodes } from '../common/enums/enums';
import { Response, Request } from 'express';
import { getTechniciansOracle } from '../data/technicians-data';
//Get All Technicians from Oracle
const getAllTechnicians = async (_req: Request, res: Response) => {
    try {
        const roles = await getTechniciansOracle();
        res.status(roles.statusCode).json({
            status: roles.statusCode,
            message: roles.message,
            payload: roles.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
};
export { getAllTechnicians };