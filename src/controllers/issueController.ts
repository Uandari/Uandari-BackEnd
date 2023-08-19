import { StatusCodes } from "../common/enums/enums";
import { Response, Request } from "express";
import { insertIssueOracle } from "../data/issue-data";

const insertIssue = async (req: Request, res: Response) => {
  try {
    const issue = {
      idHourXHour: parseInt(req.body.idHourXHour),
      idCategory: parseInt(req.body.idCategory),
      idType: parseInt(req.body.idType),
      enginesAffected: req.body.enginesAffected,
      description_: req.body.description_,
      date_: req.body.date_,
      estimateDate: req.body.estimateDate,
      status: req.body.status,
      shift: req.body.shift,
      idUser: parseInt(req.body.idUser),
    };

    const issueCreated = await insertIssueOracle(issue);
    res.status(issueCreated.statusCode).json({
      status: issueCreated.statusCode,
      message: issueCreated.message,
      payload: issueCreated.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
export { insertIssue };
