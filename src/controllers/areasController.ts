import { StatusCodes } from '../common/enums/enums';
import { Response, Request } from 'express';
import { getAllAreasOracle } from '../data/areas-data';

const getAllAreas = async (_req: Request, res: Response) => {
    try {
        const areas = await getAllAreasOracle();
        res.status(areas.statusCode).json({
            status: areas.statusCode,
            message: areas.message,
            payload: areas.vw,
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
    getAllAreas
}