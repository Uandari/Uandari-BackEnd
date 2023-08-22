import { StatusCodes } from "../common/enums/enums";
import { Response, Request } from "express";
import {
  getCategoriesOracle,
  getCategoryByIdOracle,
  getStatusIssuesOracle,
  getIssuesXAvailabilityOracle,
  getIssuesXQualityOracle,
  getIssuesXPerformanceOracle,
  getRecentIssuesOracle,
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

const getStatusIssues = async (_req: Request, res: Response) => {
  try {
    const statusIssues = await getStatusIssuesOracle();
    res.status(statusIssues.statusCode).json({
      status: statusIssues.statusCode,
      message: statusIssues.message,
      payload: statusIssues.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};

const getIssuesXAvailability = async (_req: Request, res: Response) => {
  try {
    const issuesXAvailability = await getIssuesXAvailabilityOracle();
    res.status(issuesXAvailability.statusCode).json({
      status: issuesXAvailability.statusCode,
      message: issuesXAvailability.message,
      payload: issuesXAvailability.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};

const getIssuesXQuality = async (_req: Request, res: Response) => {
  try {
    const issuesXQuality = await getIssuesXQualityOracle();
    res.status(issuesXQuality.statusCode).json({
      status: issuesXQuality.statusCode,
      message: issuesXQuality.message,
      payload: issuesXQuality.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};

const getIssuesXPerformance = async (_req: Request, res: Response) => {
  try {
    const issuesXPerformance = await getIssuesXPerformanceOracle();
    res.status(issuesXPerformance.statusCode).json({
      status: issuesXPerformance.statusCode,
      message: issuesXPerformance.message,
      payload: issuesXPerformance.vw,
    });
  } catch (error) {
    res.status(StatusCodes.SERVER_ERROR).json({
      status: StatusCodes.SERVER_ERROR,
      message: error,
      payload: [],
    });
  }
};

const getRecentIssues = async (_req: Request, res: Response) => {
  try {
    const recentIssues = await getRecentIssuesOracle();
    res.status(recentIssues.statusCode).json({
      status: recentIssues.statusCode,
      message: recentIssues.message,
      payload: recentIssues.vw,
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
  getAllCategories,
  getCategoryById,
  getStatusIssues,
  getIssuesXAvailability,
  getIssuesXQuality,
  getIssuesXPerformance,
  getRecentIssues
};
