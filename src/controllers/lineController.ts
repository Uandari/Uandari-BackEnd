import { StatusCodes } from "../common/enums/enums";
import { Response, Request } from "express";
import { getLinesOracle, insertLineOracle, updateLineOracle, getLineByIdOracle, deleteLineOracle } from "../data/line-data";

//Get All Lines
const getAllLines = async (_req: Request, res: Response) => {
    try {
        const lines = await getLinesOracle();
        res.status(lines.statusCode).json({
            status: lines.statusCode,
            message: lines.message,
            payload: lines.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
}

//Register Line
const createLine = async (req: Request, res: Response) => {
    try {
        const line = {
            lineName: req.body.lineName,
        };
        const lines = await insertLineOracle(line);
        res.status(lines.statusCode).json({
            status: lines.statusCode,
            message: lines.message,
            payload: lines.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
}

// Update Line
const updateLine = async (req: Request, res: Response) => {
    try {
        const line = {
            idLine: req.body.idLine,
            lineName: req.body.lineName,
        };
        const lines = await updateLineOracle(line);
        res.status(lines.statusCode).json({
            status: lines.statusCode,
            message: lines.message,
            payload: lines.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
}

//Get Line By Id
const getLineById = async (req: Request, res: Response) => {
    try {
        const idLine = parseInt(req.params.idLine);
        const lines = await getLineByIdOracle(idLine);
        res.status(lines.statusCode).json({
            status: lines.statusCode,
            message: lines.message,
            payload: lines.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
}

//Delete Line
const deleteLine = async (req: Request, res: Response) => {
    try {
        const idLine = parseInt(req.body.idLine);
        const lines = await deleteLineOracle(idLine);
        res.status(lines.statusCode).json({
            status: lines.statusCode,
            message: lines.message,
            payload: lines.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
}

export { getAllLines, createLine, updateLine, getLineById, deleteLine }