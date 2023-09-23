import { ResultVW } from '../common/api-interfaces/result';
import { OracleHelper } from '../handlers/OracleHelper';
import { StatusCodes } from "../common/enums/enums";
import { AREA_PROCEDURES } from '../common/enums/stored-procedures';
import { AreasModel } from "../common/entities/AreasModel";

export async function getAllAreasOracle(): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const query = AREA_PROCEDURES.GET_AREAS
        const result = await db.execute(query);
        console.log(result);
        if (!result.rows) {
            throw new Error('Query result rows are undefined');
        }
        const areas: AreasModel[] = result.rows.map((row: any) => ({
            idArea: row[0],
            name: row[1],
        }));

        if (areas.length === 0) {
            return new ResultVW(
                'There are no areas to show',
                StatusCodes.NOT_FOUND,
                areas
            );
        }
        const areaResult: ResultVW = new ResultVW(
            'Area',
            StatusCodes.OK,
            areas
        );
        return areaResult;
    } catch (error) {
        throw error;
    }
}