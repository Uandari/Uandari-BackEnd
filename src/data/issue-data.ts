import { OracleHelper } from '../handlers/OracleHelper';
import { IssueModel } from '../common/entities/IssueModel';
import { ResultVW } from '../common/api-interfaces/result';
import { ISSUE_PROCEDURES } from '../common/enums/stored-procedures';
import { StatusCodes } from '../common/enums/enums';

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
      idUser,
    } = issue;
    const query = {
      text: ISSUE_PROCEDURES.INSERT_ISSUE,
      values: [
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
      ],
    }

    console.log(query);
    await db.execute(query.text, query.values);
    const issueResult: ResultVW = new ResultVW(
      'Issue created',
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
    const query = {
      text: ISSUE_PROCEDURES.GETBYID,
      values: [idIssue],
    }
    const result: any = await db.execute(query.text, query.values);
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
      return new ResultVW('Issue not found', StatusCodes.NOT_FOUND, []);
    }

    const query = {
      text: ISSUE_PROCEDURES.GETBYID,
      values: [idIssue],
    }
    const result: any = await db.execute(query.text, query.values);
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
      'Issue found',
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
    const query = {
      text: ISSUE_PROCEDURES.UPDATE_ISSUE,
      values: [
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
      ],
    }

    await db.execute(query.text, query.values);
    let issueResult: ResultVW;
    if (typeof idIssue === 'number') {
      issueResult = await getIssueByIdOracle(idIssue);
      if (issueResult.vw.length === 0) {
        return new ResultVW('Issue not found', StatusCodes.NOT_FOUND, []);
      }
      return new ResultVW('Issue updated', StatusCodes.OK, issueResult.vw);
    }
    return new ResultVW('Something went wrong ', StatusCodes.NOT_FOUND, []);
  } catch (error) {
    throw error;
  }
}
//Delete Issue
export async function deleteIssueOracle(idIssue: number): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();
    console.log(idIssue)
    if (!(await verifyIssueOracle(idIssue))) {
      return new ResultVW('Issue not found', StatusCodes.NOT_FOUND, []);
    }
    const query = {
      text: ISSUE_PROCEDURES.DELETE_ISSUE,
      values: [idIssue],
    }
    console.log(query);
    await db.execute(query.text, query.values);
    const issue = await getIssueByIdOracle(idIssue);
    return new ResultVW('Issue deleted', StatusCodes.OK, issue.vw);
  } catch (error) {
    throw error;
  }
}
//List of issue
// ... código previo

export async function listOfIssuesOracle(): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();
    const query = ISSUE_PROCEDURES.LISTOFISSUES
    const result: any = await db.execute(query);
    const groupedIssues: any = {};

    result.rows.forEach((row: any) => {
      const typeCategory = row[2];
      const description = row[3];
      const day = row[0];
      const shift = row[1];
      const enginesAffected = row[4];

      if (!groupedIssues[typeCategory]) {
        groupedIssues[typeCategory] = [];
      }

      const existingIssue = groupedIssues[typeCategory].find(
        (issue: any) => issue.description === description
      );

      if (existingIssue) {
        const existingDay = existingIssue.days.find(
          (d: any) => d.day === day
        );
        if (existingDay) {
          if (!existingDay.shifts[shift]) {
            existingDay.shifts[shift] = [];
          }
          existingDay.shifts[shift].push(enginesAffected);
        } else {
          existingIssue.days.push({
            day: day,
            shifts: {
              [shift]: enginesAffected,
              'A': [],
              'B': [],
              'C': [],
            }
          });
        }
      } else {
        groupedIssues[typeCategory].push({
          typeCategory: typeCategory,
          description: description,
          days: [
            {
              day: day,
              shifts: {
                [shift]: [enginesAffected],
                'A': [],
                'B': [],
                'C': [],
              }
            }
          ]
        });
      }
    });

    const groupedPayload = Object.values(groupedIssues);
    const issueResult: ResultVW = new ResultVW(
      'Issues found',
      StatusCodes.OK,
      groupedPayload
    );
    return issueResult;

  } catch (error) {
    throw error;
  }
}

export async function verifyIssueHourXHourOracle(idIssue: number): Promise<boolean> {
  try {
    const db = await new OracleHelper().createConnection();
    const query = {
      text: ISSUE_PROCEDURES.GETISSUESBYHOURS,
      values: [idIssue],
    }
    const result: any = await db.execute(query.text, query.values);
    return result.rows && result.rows.length > 0;
  } catch (error) {
    throw error;
  }
}

export async function issueXIdHourxHour(idIssue: number): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();
    if (!(await verifyIssueHourXHourOracle(idIssue))) {
      return new ResultVW('No issue at this time', StatusCodes.BAD_REQUEST, []);
    }
    const query = {
      text: ISSUE_PROCEDURES.GETISSUESBYHOURS,
      values: [idIssue],
    }
    const result: any = await db.execute(query.text, query.values);
    const issue: IssueModel = result.rows.map((row: any) => ({
      idIssue: row[0],
      idHourXHour: row[1],
      description_: row[6],
      typeCategory: row[12]
    }));
    const issueResult: ResultVW = new ResultVW(
      'Issue found',
      StatusCodes.OK,
      issue
    );
    return issueResult;
  }
  catch (error) {
    throw error;
  }

}


