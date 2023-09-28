import { StatusCodes } from "../common/enums/enums";
import { Response, Request } from "express";
import { 
    getObjectivesIndicatorsByIdOracle,
    getObjectivesIndicatorsOracle
} from "../data/objectivesindicators-data";

const getAllObjectivesIndicators = async (_req: Request, res: Response) => {
    try {
        const objectivesIndicators = await getObjectivesIndicatorsOracle();
        res.status(objectivesIndicators.statusCode).json({
            status: objectivesIndicators.statusCode,
            message: objectivesIndicators.message,
            payload: objectivesIndicators.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
}

const getObjectivesIndicatorsById = async (req: Request, res: Response) => {
    try {
        const idObjectivesIndicators = parseInt(req.params.id);
        const objectivesIndicators = await getObjectivesIndicatorsByIdOracle(idObjectivesIndicators);
        res.status(objectivesIndicators.statusCode).json({
            status: objectivesIndicators.statusCode,
            message: objectivesIndicators.message,
            payload: objectivesIndicators.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
}

export { getAllObjectivesIndicators, getObjectivesIndicatorsById };