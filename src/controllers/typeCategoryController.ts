import { StatusCodes } from '../common/enums/enums';
import { Response, Request } from 'express';
import { 
    getTypeCategoriesOracle,
    getTypeCategoryByIdOracle
} from '../data/typeCategory-data';

//Get all Type Categories from Oracle
const getAllTypeCategories = async (_req: Request, res: Response) => {
    try {
        const typeCategories = await getTypeCategoriesOracle();
        res.status(typeCategories.statusCode).json({
            status: typeCategories.statusCode,
            message: typeCategories.message,
            payload: typeCategories.vw
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: []
        });
    }
};

const getTypeCategoryById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const typeCategory = await getTypeCategoryByIdOracle(id);
        res.status(typeCategory.statusCode).json({
          status: typeCategory.statusCode,
          message: typeCategory.message,
          payload: typeCategory.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
};

export { getAllTypeCategories, getTypeCategoryById };