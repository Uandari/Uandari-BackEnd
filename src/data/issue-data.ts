import { OracleHelper } from "../handlers/OracleHelper";
import { IssueModel } from "../common/entities/IssueModel";
import { ResultVW } from "../common/api-interfaces/result";
import { ISSUE_PROCEDURES } from "../common/enums/stored-procedures";
import { StatusCodes } from "../common/enums/enums";

//Insert a new issue using Oracle procedure

export async function insertIssueOracle(issue: IssueModel): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const {
      idHourXHour,
      idCategory,
      idType,
      enginesAffected,
      description_,
      date_,
      estimateDate,
      status,
      shift,
      isDelete,
      idUser,
    } = issue;
    const query = `BEGIN
    ${ISSUE_PROCEDURES.INSERT_ISSUE}(
        ${idHourXHour},
        ${idCategory},
        ${idType},
        ${enginesAffected},
        '${description_}',
        '${date_}',
        '${estimateDate}',
        '${status}',
        '${shift}',
        ${idUser}
    );
    END;`;
    console.log(isDelete);
    console.log(query);
    await db.execute(query);
    const issueResult: ResultVW = new ResultVW(
      "Issue created",
      StatusCodes.OK,
      issue
    );
    return issueResult;
  } catch (error) {
    throw error;
  }
}
//Veryfy if the issue exists
export async function verifyIssueOracle(idIssue: number): Promise<boolean> {
  try {
    const db = await new OracleHelper().createConnection();
    const query = `${ISSUE_PROCEDURES.GETBYID}${idIssue}`;
    const result: any = await db.execute(query);
    return result.rows && result.rows.length > 0;
  } catch (error) {
    throw error;
  }
}
//Issue by id
export async function getIssueByIdOracle(idIssue: number): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();

    if (!(await verifyIssueOracle(idIssue))) {
      return new ResultVW("Issue not found", StatusCodes.NOT_FOUND, []);
    }

    const query = `${ISSUE_PROCEDURES.GETBYID}(${idIssue})`;
    console.log(query);
    const result: any = await db.execute(query);
    const issue: IssueModel = result.rows.map((row: any) => ({
      idIssue: row[0],
      idHourXHour: row[1],
      idCategory: row[2],
      idType: row[3],
      enginesAffected: row[4],
      description_: row[5],
      date_: row[6],
      estimateDate: row[7],
      status: row[8],
      shift: row[9],
      isDelete: row[10],
      idUser: row[11],
    }));
    const issueResult: ResultVW = new ResultVW(
      "Issue found",
      StatusCodes.OK,
      issue
    );
    return issueResult;
  } catch (error) {
    throw error;
  }
}
//update issue
export async function updateIssueOracle(issue: IssueModel): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();
    const {
      idIssue,
      idHourXHour,
      idCategory,
      idType,
      enginesAffected,
      description_,
      date_,
      estimateDate,
      status,
      shift,
      idUser,
    } = issue;
    const query = `BEGIN
    ${ISSUE_PROCEDURES.UPDATE_ISSUE}(
        ${idIssue},
        ${idHourXHour},
        ${idCategory},
        ${idType},
        ${enginesAffected},
        '${description_}',
        '${date_}',
        '${estimateDate}',
        '${status}',
        '${shift}',
        ${idUser}
        );
        END;`;

    await db.execute(query);
    let issueResult: ResultVW;
    if (typeof idIssue === "number") {
      issueResult = await getIssueByIdOracle(idIssue);
      if (issueResult.vw.length === 0) {
        return new ResultVW("Issue not found", StatusCodes.NOT_FOUND, []);
      }
      return new ResultVW("Issue updated", StatusCodes.OK, issueResult.vw);
    }
    return new ResultVW("Something went wrong ", StatusCodes.NOT_FOUND, []);
  } catch (error) {
    throw error;
  }
}
export async function deleteIssueOracle(idIssue: number): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();
    if (!(await verifyIssueOracle(idIssue))) {
      return new ResultVW("Issue not found", StatusCodes.NOT_FOUND, []);
    }
    const query = `BEGIN
    ${ISSUE_PROCEDURES.DELETE_ISSUE}(${idIssue});
    END;`;
    await db.execute(query);
    const issue = await getIssueByIdOracle(idIssue);
    return new ResultVW("Issue deleted", StatusCodes.OK, issue.vw);
  } catch (error) {
    throw error;
  }
}