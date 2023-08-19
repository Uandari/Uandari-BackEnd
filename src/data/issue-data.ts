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
