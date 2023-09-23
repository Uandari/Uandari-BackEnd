
import { OracleHelper } from '../handlers/OracleHelper';
import { ResultVW } from '../common/api-interfaces/result';
import { StatusCodes } from '../common/enums/enums';
import { OPERATION_PROCEDURES } from '../common/enums/stored-procedures';
import { OperationModel } from '../common/entities/OperationModel';

export async function getOperationOracle(): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const query = OPERATION_PROCEDURES.GET_OPERATION
        const result = await db.execute(query);
        console.log(result);
        if (!result.rows) {
            throw new Error('Query result rows are undefined');
        }
        const operations: OperationModel[] = result.rows.map((row: any) => ({
            idOperation: row[0],
            idCell: row[1],
            name: row[2],
        }));

        if (operations.length === 0) {
            return new ResultVW(
                'There are no operations to show',
                StatusCodes.NOT_FOUND,
                operations
            );
        }
        const operationResult: ResultVW = new ResultVW(
            'Operation',
            StatusCodes.OK,
            operations
        );
        return operationResult;
    } catch (error) {
        throw error;
    }
}
