import { OracleHelper } from '../handlers/OracleHelper';
import oracledb from 'oracledb';
import { HourXHourModel } from '../common/entities/HourxHourModel';
import { ResultVW } from '../common/api-interfaces/result';
import { MustAndGetID } from '../common/api-interfaces/HourxHour-api/insertMustAndGetID';
import { HOURXHOUR_PROCEDURES } from '../common/enums/stored-procedures';
import { StatusCodes } from '../common/enums/enums';

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
    const query = `${HOURXHOUR_PROCEDURES.INSERT_MUST_AND_GET_ID}`;
    const idHourXHour: any = await db.execute(query, bindVars);
    const mustResult: MustAndGetID = new MustAndGetID(
      must,
      idHourXHour.outBinds.p_id
    );
    const hourXhourResult: ResultVW = new ResultVW(
      'HourXHour created',
      StatusCodes.OK,
      mustResult
    );
    return hourXhourResult;
  } catch (error) {
    throw error;
  }
}
//Get by id hourXhour
export async function getHourXHourByIdOracle(
  idHoraxHora: number
): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    if (!(await verifyHourXHourOracle(idHoraxHora))) {
      return new ResultVW('Hour not found', StatusCodes.NOT_FOUND, []);
    }
    const query = `${HOURXHOUR_PROCEDURES.GETBYID}(${idHoraxHora})`;
    const result: any = await db.execute(query);
    const hourResult: HourXHourModel = result.rows.map((row: any) => ({
      idHourxHour: row[0],
      hour: row[1],
      date: row[2],
      must: row[3],
      mustAcomulative: row[4],
      is: row[5],
      isAcomulative: row[6],
      diference: row[7],
      diferenceAcomulative: row[8],
      idUser: row[9],
      idCell: row[10],
    }));
    const hourXhourResult: ResultVW = new ResultVW(
      'HourXHour found',
      StatusCodes.OK,
      hourResult
    );
    return hourXhourResult;
  } catch (error) {
    throw error;
  }
}
//Veryfy if hourXhour exist
export async function verifyHourXHourOracle(
  idHourXHour: number
): Promise<boolean> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = `${HOURXHOUR_PROCEDURES.GETBYID}(${idHourXHour})`;
    const result: any = await db.execute(query);
    return result.rows && result.rows.length > 0;
  } catch (error) {
    throw error;
  }
}
//UPDATE HOURXHOUR
export async function updateHourXHourOracle(
  hourXhour: HourXHourModel
): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const {
      idHourxHour,
      hour,
      date,
      must,
      mustAccumulative,
      is,
      isAccumulative,
      difference,
      accumulativeDifference,
      idCell,
      idUser,
    } = hourXhour;

    const query = `BEGIN
    ${HOURXHOUR_PROCEDURES.UPDATE_HOURXHOUR}(
     ${idHourxHour},
     '${hour}',
     '${date}',
      ${must},
      ${mustAccumulative},
      ${is},
      ${isAccumulative},
      ${difference},
      ${accumulativeDifference},
      ${idCell},
      ${idUser}
    );
    END;`;
    await db.execute(query);
    let hourXhourResult: ResultVW;

    if (typeof idHourxHour === 'number') {
      hourXhourResult = await getHourXHourByIdOracle(idHourxHour);
      if (hourXhourResult.vw.length === 0) {
        return new ResultVW('Hour not found', StatusCodes.NOT_FOUND, []);
      }
      return new ResultVW(
        'HourXHour updated',
        StatusCodes.OK,
        hourXhourResult.vw
      );
    }
    return new ResultVW('Something went wrong ', StatusCodes.NOT_FOUND, []);
  } catch (error) {
    throw error;
  }
}
//GET ALL HOURXHOUR
export async function getAllHourXHourOracle(): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();
    const query = `${HOURXHOUR_PROCEDURES.GET_HOURXHOUR}`;
    const result = await db.execute(query);

    if (!result.rows) {
      return new ResultVW('HourXHour not found', StatusCodes.NOT_FOUND, []);
    }

    const hourXhourMap = new Map();
    result.rows.forEach((row: any) => {
      const idHourxHour = row[0];
      if (!hourXhourMap.has(idHourxHour)) {
        hourXhourMap.set(idHourxHour, {
          idHourxHour,
          hour: row[1],
          date: row[2],
          must: row[3],
          mustAccumulative: row[4],
          is: row[5],
          isAccumulative: row[6],
          difference: row[7],
          accumulativeDifference: row[8],
          idUser: row[9],
          idCell: row[10],
          issues: [],
        });
      }
      hourXhourMap.get(idHourxHour).issues.push({
        idhourxhourIssue: row[11],
        description: row[13],
        type: {
          name: row[22],
        },
      });
    });

    const hourXhourResult = [...hourXhourMap.values()];

    if (hourXhourResult.length === 0) {
      return new ResultVW('HourXHour not found', StatusCodes.NOT_FOUND, []);
    }

    return new ResultVW('HourXHour found', StatusCodes.OK, hourXhourResult);
  } catch (error) {
    throw error;
  }
}
//GET HOURX HOUR WITH OUT ISSUES
export async function getHourXHour(): Promise<ResultVW> {
  try {
    const db = await new OracleHelper().createConnection();
    const query = `${HOURXHOUR_PROCEDURES.GET_HOURXHOUR_WITHOUT_ISSUES}`;
    const result = await db.execute(query);
    if (!result.rows) {
      return new ResultVW('HourXHour not found', StatusCodes.NOT_FOUND, []);
    }
    const hourXhour: any = result.rows.map((row: any) => ({
      idHourxHour: row[0],
      hour: row[1],
      date: row[2],
      must: row[3],
      mustAccumulative: row[4],
      is: row[5],
      isAccumulative: row[6],
      diference: row[7],
      diferenceAcomulative: row[8],
      idCell: row[9],
      idUser: row[10],
    }))
    const hourXhourResult: ResultVW = new ResultVW(
      'HourXHour found',
      StatusCodes.OK,
      hourXhour
    );
    return hourXhourResult;

  } catch (error) {
    throw error;
  }
}
