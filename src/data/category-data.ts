import { OracleHelper } from "../handlers/OracleHelper";
import { CategoryModel } from "../common/entities/CategoryModel";
import { ResultVW } from "../common/api-interfaces/result";
import { CATEGORY_PROCEDURES } from "../common/enums/stored-procedures";
import { StatusCodes } from "../common/enums/enums";

//Get all categories using oracle procedure
export async function getCategoriesOracle(): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = `${CATEGORY_PROCEDURES.GET_CATEGORIES}`;
    const result = await db.execute(query);
    if (!result.rows) {
      throw new Error("Query result rows are undefined");
    }
    const categories: CategoryModel[] = result.rows.map((category: any) => ({
      idCategory: category[0],
      name: category[1],
      description: category[2],
    }));
    if (categories.length === 0) {
      return new ResultVW(
        "There are no categories to display",
        StatusCodes.NO_CONTENT,
        categories
      );
    }
    return new ResultVW("Categories Found", StatusCodes.OK, categories);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}

//verify if a category exists using oracle
export async function verifyCategoryExistsOracle(
  idCategory: number
): Promise<Boolean> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = `${CATEGORY_PROCEDURES.GETBYID} ${idCategory}`;
    const result: any = await db.execute(query);
    return result.rows && result.rows.length > 0;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}

//get user by id using oracle
export async function getCategoryByIdOracle(
  idCategory: number
): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    if (!(await verifyCategoryExistsOracle(idCategory))) {
      return new ResultVW("Category Not Found", StatusCodes.NOT_FOUND, []);
    }
    const query = `${CATEGORY_PROCEDURES.GETBYID} ${idCategory}`;
    const result: any = await db.execute(query);
    const category: CategoryModel = result.rows.map((row: any) => ({
      idCategory: row[0],
      name: row[1],
      categoryType: row[2],
      description: row[3],
    }));
    return new ResultVW("Category Found", StatusCodes.OK, category);
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
}

//Get status issues using oracle view
export async function getStatusIssuesOracle(): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();
    const query = `${CATEGORY_PROCEDURES.GET_STATUS_ISSUES}`;
    const result = await db.execute(query);
    if (!result.rows) {
      throw new Error("Query result rows are undefined");
    }
    const statusIssues: any[] = result.rows.map((statusIssue: any) => ({
      idIssue: statusIssue[0],
      description: statusIssue[1],
      status: statusIssue[2],
      typeName: statusIssue[3],
    }));
    if (statusIssues.length === 0) {
      return new ResultVW(
        "There are no status issues to display",
        StatusCodes.BAD_REQUEST,
        statusIssues
      );
    }
    return new ResultVW("Status Issues Found", StatusCodes.OK, statusIssues);
  } catch (error) {
    throw error;
  }
}

//GET ISSUES X AVAILABILITY
export async function getIssuesXAvailabilityOracle(): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();
    const query = `${CATEGORY_PROCEDURES.GET_ISSUESXAVAILABILITY}`;
    const result = await db.execute(query);
    if (!result.rows) {
      throw new Error("Query result rows are undefined");
    }
    const issuesXAvailability: any[] = result.rows.map((statusIssue: any) => ({
      category: "Disponibilidad",
      categoryType: statusIssue[0],
      issueCount: statusIssue[1],
    }));
    if (issuesXAvailability.length === 0) {
      return new ResultVW(
        "There are no status issues to display",
        StatusCodes.BAD_REQUEST,
        issuesXAvailability
      );
    }
    return new ResultVW(
      "Issues Availability Found",
      StatusCodes.OK,
      issuesXAvailability
    );
  } catch (error) {
    throw error;
  }
}

//GET ISSUES X QUALITY
export async function getIssuesXQualityOracle(): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();
    const query = `${CATEGORY_PROCEDURES.GET_ISSUESXQUALITY}`;
    const result = await db.execute(query);
    if (!result.rows) {
      throw new Error("Query result rows are undefined");
    }
    const issuesXQuality: any[] = result.rows.map((statusIssue: any) => ({
      category: "Calidad",
      categoryType: statusIssue[0],
      issueCount: statusIssue[1],
    }));
    if (issuesXQuality.length === 0) {
      return new ResultVW(
        "There are no status issues to display",
        StatusCodes.BAD_REQUEST,
        issuesXQuality
      );
    }
    return new ResultVW("Issues Quality Found", StatusCodes.OK, issuesXQuality);
  } catch (error) {
    throw error;
  }
}

//GET ISSUES X PERFORMANCE
export async function getIssuesXPerformanceOracle(): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();
    const query = `${CATEGORY_PROCEDURES.GET_ISSUESXPERFORMANCE}`;
    const result = await db.execute(query);
    if (!result.rows) {
      throw new Error("Query result rows are undefined");
    }
    const issuesXPerformance: any[] = result.rows.map((statusIssue: any) => ({
      category: "Desempeño",
      categoryType: statusIssue[0],
      issueCount: statusIssue[1],
    }));
    if (issuesXPerformance.length === 0) {
      return new ResultVW(
        "There are no status issues to display",
        StatusCodes.BAD_REQUEST,
        issuesXPerformance
      );
    }
    return new ResultVW(
      "Issues Performance Found",
      StatusCodes.OK,
      issuesXPerformance
    );
  } catch (error) {
    throw error;
  }
}

//GET RECENT_ISSUES
export async function getRecentIssuesOracle(): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();
    const query = `${CATEGORY_PROCEDURES.GET_RECENTISSUES}`;
    const result = await db.execute(query);
    if (!result.rows) {
      throw new Error("Query result rows are undefined");
    }
    const issuesRecent: any[] = result.rows.map((statusIssue: any) => ({
      idIssue: statusIssue[0],
      categoryName: statusIssue[1],
      categoryType: statusIssue[2],
      description: statusIssue[3],
      date: statusIssue[4],
      responsible: statusIssue[5],
      status: statusIssue[6],
      enginesAffected: statusIssue[7],
    }));
    if (issuesRecent.length === 0) {
      return new ResultVW(
        "There are no status issues to display",
        StatusCodes.BAD_REQUEST,
        issuesRecent
      );
    }
    return new ResultVW("Issues Recent Found", StatusCodes.OK, issuesRecent);
  } catch (error) {
    throw error;
  }
}
