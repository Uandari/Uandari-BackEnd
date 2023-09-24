import { StatusCodes } from '../common/enums/enums';
import { Response, Request } from 'express';
import { getCarsOracle } from '../data/car-data';

//Get All Cars from Oracle
const getAllCars = async (_req: Request, res: Response) => {
    try {
        const cars = await getCarsOracle();
        res.status(cars.statusCode).json({
            status: cars.statusCode,
            message: cars.message,
            payload: cars.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
};

export {
    getAllCars
}