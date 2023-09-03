import { StatusCodes } from '../common/enums/enums';
import { Response, Request } from 'express';
import {
  insertIssueOracle,
  getIssueByIdOracle,
  updateIssueOracle,
  deleteIssueOracle,
  listOfIssuesOracle,
  issueXIdHourxHour
} from '../data/issue-data';

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
const getIssueById = async (req: Request, res: Response) => {
  try {
    const idIssue = parseInt(req.params.id);
    const issue = await getIssueByIdOracle(idIssue);
    res.status(issue.statusCode).json({
      status: issue.statusCode,
      message: issue.message,
      payload: issue.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
const updateIssue = async (req: Request, res: Response) => {
  try {
    const issue = {
      idIssue: parseInt(req.body.idIssue),
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
    const issueUpdated = await updateIssueOracle(issue);
    res.status(issueUpdated.statusCode).json({
      status: issueUpdated.statusCode,
      message: issueUpdated.message,
      payload: issueUpdated.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
const deleteIssue = async (req: Request, res: Response) => {
  try {
    const idIssue = parseInt(req.body.idIssue);
    const issueDeleted = await deleteIssueOracle(idIssue);
    res.status(issueDeleted.statusCode).json({
      status: issueDeleted.statusCode,
      message: issueDeleted.message,
      payload: issueDeleted.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
const listOfIssues = async (_req: Request, res: Response) => {
  try {
    const listIssues = await listOfIssuesOracle();
    res.status(listIssues.statusCode).json({
      status: listIssues.statusCode,
      message: listIssues.message,
      payload: listIssues.vw,
    });

  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
}
//issueXIdHourxHour
const issuesXHour = async (req: Request, res: Response) => {
  try {
    const idIssue = parseInt(req.body.idHourXHour);
    const issues = await issueXIdHourxHour(idIssue);
    res.status(issues.statusCode).json({
      status: issues.statusCode,
      message: issues.message,
      payload: issues.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};
export { insertIssue, getIssueById, updateIssue, deleteIssue, listOfIssues, issuesXHour };
