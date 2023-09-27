import { OracleHelper } from '../handlers/OracleHelper';
//import { TechniciansModel } from '../common/entities/TechniciansModel';
import { TechniciansResponse } from '../common/api-interfaces/user/techniciansResponse';
import { ResultVW } from '../common/api-interfaces/result';
import { TECHNICIAN_PROCEDURES } from '../common/enums/stored-procedures';
import { StatusCodes } from '../common/enums/enums';

//Get all technicians using Oracle procedure
export async function getTechniciansOracle(): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const query = TECHNICIAN_PROCEDURES.GET_ALL_TECHNICIANS
        const result = await db.execute(query);
        if (!result.rows) {
            throw new Error('Query result rows are undefined');
        }
        const technicians: TechniciansResponse[] = result.rows.map((technician: any) => ({
            idTechnician: technician[0],
            name: technician[1],
            lastNames: technician[2],
            controlNumber: technician[3],
            cell: technician[4],
            line: technician[5],
            operation: technician[6],
            position: technician[7],
            realPosition: technician[8],
        }));
        if (technicians.length === 0) {
            return new ResultVW(
                'There are no technicians to show',
                StatusCodes.NOT_FOUND,
                technicians
            );
        }
        return new ResultVW('Technicians found', StatusCodes.OK, technicians);
    } catch (error) {
        throw error;
    } finally {
        db.close();
    }
}