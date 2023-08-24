import { StatusCodes } from "../common/enums/enums";
import { Response, Request } from "express";
import {
    getEscalatedIssuesOracle,
    insertEscalatedIssueOracle
} from "../data/escalatedIssue-data";

const insertEscalatedIssue = async (req: Request, res: Response) => {
    try {
        const escalatedIssue = {
            idProblemScaled: parseInt(req.body.idProblemScaled),
            dateScaling: req.body.dateScaling,
            scaleDeviation: parseInt(req.body.scaleDeviation),
            impeller: req.body.impeller,
            affect5s: req.body.affect5s,
            agreedAction: req.body.agreedAction,
            idUser: parseInt(req.body.idUser),
            status: parseInt(req.body.status),
            deadline: req.body.deadline,
            idIssue: parseInt(req.body.idIssue)
        };
        const escalatedIssueCreated = await insertEscalatedIssueOracle(escalatedIssue);
        res.status(escalatedIssueCreated.statusCode).json({
            status: escalatedIssueCreated.statusCode,
            message: escalatedIssueCreated.message,
            payload: escalatedIssueCreated.vw
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
};

const getAllEscalatedIssues = async (_req: Request, res: Response) => {
    try {
        const escalatedIssues = await getEscalatedIssuesOracle();
        res.status(escalatedIssues.statusCode).json({
            status: escalatedIssues.statusCode,
            message: escalatedIssues.message,
            payload: escalatedIssues.vw,
        });
    } catch (error) {
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: error,
            payload: [],
        });
    }
};

export { insertEscalatedIssue, getAllEscalatedIssues };
