import { OracleHelper } from '../handlers/OracleHelper';
import { CarModel } from '../common/entities/CarModel';
import { ResultVW } from '../common/api-interfaces/result';
import { CAR_PROCEDURES } from '../common/enums/stored-procedures';
import { StatusCodes } from '../common/enums/enums';


//Get all cars using Oracle procedure
export async function getCarsOracle(): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const query = CAR_PROCEDURES.GET_CARS;
        const result = await db.execute(query);
        if (!result.rows) {
            throw new Error('Query result rows are undefined');
        }
        const cars: CarModel[] = result.rows.map((row: any) => ({
            idCar: row[0],
            name: row[1],
        }));
        if (cars.length === 0) {
            return new ResultVW(
                'There are no cars to show',
                StatusCodes.NOT_FOUND,
                cars
            );
        }
        return new ResultVW('successfully extracted cars', StatusCodes.OK, cars);
    } catch (error) {
        throw error;
    } finally {
        db.release();
    }
}