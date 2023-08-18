import { OracleHelper } from "../handlers/OracleHelper";
import oracledb from "oracledb";
//import { HourXHour } from "../common/entities/HourxHourModel";
import { ResultVW } from "../common/api-interfaces/result";
import { MustAndGetID } from "../common/api-interfaces/HourxHour-api/insertMustAndGetID";
//import { HOURXHOUR_PROCEDURES } from "../common/enums/stored-procedures";
import { StatusCodes } from "../common/enums/enums";

//INSERT MUST AND GET ID
export async function insertMustAndGetIDOracle(
  hourXhour: MustAndGetID
): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const { must } = hourXhour;
    const bindVars: oracledb.BindParameters = {
      p_must: must,
      p_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    };
    const query = `BEGIN InsertMustAndGetID(:p_must, :p_id); END;`;
    const idHourXHour: any = await db.execute(query, bindVars);
    const mustResult: MustAndGetID = new MustAndGetID(
      must,
      idHourXHour.outBinds.p_id
    );
    const hourXhourResult: ResultVW = new ResultVW(
      "HourXHour created",
      StatusCodes.OK,
      mustResult
    );
    return hourXhourResult;
  } catch (error) {
    throw error;
  }
}
