import { StatusCodes } from "../common/enums/enums";
import { Response, Request } from "express";
import {
    getCategoriesOracle,
    getCategoryByIdOracle
} from "../data/category-data";

const getAllCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await getCategoriesOracle();
        res.status(categories.statusCode).json({
            status: categories.statusCode,
            message: categories.message,
            payload: categories.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
};

const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const category = await getCategoryByIdOracle(id);
        res.status(category.statusCode).json({
            status: category.statusCode,
            message: category.message,
            payload: category.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
};

export { getAllCategories, getCategoryById };