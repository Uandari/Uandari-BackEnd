import { OracleHelper } from "src/handlers/OracleHelper";
import { ObjectivesIndicatorsModel } from "src/common/entities/ObjectivesIndicatorsModel";
import { ResultVW } from "src/common/api-interfaces/result";
import { OBJECTIVESINDICATORS_PROCEDURES } from "src/common/enums/stored-procedures";
import { StatusCodes } from "src/common/enums/enums";

//Get all ObjectivesIndicators
export async function getObjectivesIndicatorsOracle(): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = {
      text: OBJECTIVESINDICATORS_PROCEDURES.GET_OBJECTIVESINDICATORS,
      values: []
    }
    const result: any = await db.execute(query.text, query.values);
    const objectivesIndicatorsResult: ObjectivesIndicatorsModel[] = result.rows.map((row: any) => ({
      idObjectivesIndicators: row[0],
      security_MUST: row[1],
      productionVolume_MUST: row[2],
      issuesB_MUST: row[3],
      issuesC1_MUST: row[4],
      damagedMaterial_MUST: row[5],
      idUser: row[6],
      isDelete: row[7]
    }));
    const objectivesIndicators: ResultVW = new ResultVW(
      'ObjectivesIndicators',
      StatusCodes.OK,
      objectivesIndicatorsResult
    );
    return objectivesIndicators;
  } catch (error) {
    throw error;
  }
}

export async function verifyObjectivesIndicatorsOracle(idObjectivesIndicators: number): Promise<boolean> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = {
      text: OBJECTIVESINDICATORS_PROCEDURES.GETBYID,
      values: [idObjectivesIndicators]
    }
    const result: any = await db.execute(query.text, query.values);
    return result.rows && result.rows.length > 0;
  } catch (error) {
    throw error;
  }
}

//Get by id ObjectivesIndicators
export async function getObjectivesIndicatorsByIdOracle(
  idObjectivesIndicators: number
): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    if (!(await verifyObjectivesIndicatorsOracle(idObjectivesIndicators))) {
      return new ResultVW('ObjectivesIndicators not found', StatusCodes.NOT_FOUND, []);
    }
    const query = {
      text: OBJECTIVESINDICATORS_PROCEDURES.GETBYID,
      values: [idObjectivesIndicators]
    }
    const result: any = await db.execute(query.text, query.values);
    const objectivesIndicatorsResult: ObjectivesIndicatorsModel = result.rows.map((row: any) => ({
      idObjectivesIndicators: row[0],
      security_MUST: row[1],
      productionVolume_MUST: row[2],
      issuesB_MUST: row[3],
      issuesC1_MUST: row[4],
      damagedMaterial_MUST: row[5],
      idUser: row[6],
      isDelete: row[7]
    }));
    const objectivesIndicators: ResultVW = new ResultVW(
      'ObjectivesIndicators',
      StatusCodes.OK,
      objectivesIndicatorsResult
    );
    return objectivesIndicators;
  } catch (error) {
    throw error;
  }
}
