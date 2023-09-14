import { OracleHelper } from "src/handlers/OracleHelper";
import { LineModel } from "src/common/entities/LineModel";
import { ResultVW } from "src/common/api-interfaces/result";
import { LINE_PROCEDURES } from "src/common/enums/stored-procedures";
import { StatusCodes } from "src/common/enums/enums";

//Get all lines using Oracle procedure
export async function getLinesOracle(): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const query = LINE_PROCEDURES.GET_LINES;
        const result = await db.execute(query);
        if (!result.rows) {
            throw new Error('Query result rows are undefined');
        }
        const lines: LineModel[] = result.rows.map((row: any) => ({
            idLine: row[0],
            lineName: row[1],
        }));
        if (lines.length === 0) {
            return new ResultVW(
                'There are no lines to show',
                StatusCodes.NOT_FOUND,
                lines
            );
        }
        return new ResultVW('successfully extracted lines', StatusCodes.OK, lines);
    } catch (error) {
        throw error;
    }
    finally {
        db.release();
    }
}

//Create a new line using Oracle procedure
export async function insertLineOracle(line: LineModel): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const { lineName } = line;
        const query = {
            text: LINE_PROCEDURES.INSERT_LINE,
            values: [
                lineName
            ]
        }
        await db.execute(query.text, query.values);
        const lineResult: ResultVW = new ResultVW(
            'Line created',
            StatusCodes.OK,
            line
        );
        return lineResult;
    } catch (error) {
        throw error;
    }
    finally {
        db.release();
    }
}

//Update a line using Oracle procedure
export async function updateLineOracle(line: LineModel): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const { idLine, lineName } = line;
        const query = {
            text: LINE_PROCEDURES.UPDATE_LINE,
            values: [
                idLine,
                lineName
            ]
        }
        await db.execute(query.text, query.values);
        const lineResult: ResultVW = new ResultVW(
            'Line updated',
            StatusCodes.OK,
            line
        );
        return lineResult;
    } catch (error) {
        throw error;
    }
    finally {
        db.release();
    }
}

//Get a line by id using Oracle procedure
export async function getLineByIdOracle(idLine: number): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const query = {
            text: LINE_PROCEDURES.GETBYID,
            values: [
                idLine
            ]
        }
        const result = await db.execute(query.text, query.values);
        if (!result.rows) {
            throw new Error('Query result rows are undefined');
        }
        const line: LineModel = result.rows.map((row: any) => ({
            idLine: row[0],
            lineName: row[1],
        }))[0];
        if (!line) {
            return new ResultVW(
                'Line not found',
                StatusCodes.NOT_FOUND,
                line
            );
        }
        return new ResultVW('successfully extracted line', StatusCodes.OK, line);
    } catch (error) {
        throw error;
    }
    finally {
        db.release();
    }
}

//Delete a line by id using Oracle procedure
export async function deleteLineOracle(idLine: number): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const query = {
            text: LINE_PROCEDURES.DELETE_LINE,
            values: [
                idLine
            ]
        }
        await db.execute(query.text, query.values);
        const lineResult: ResultVW = new ResultVW(
            'Line deleted',
            StatusCodes.OK,
            null
        );
        return lineResult;
    } catch (error) {
        throw error;
    }
    finally {
        db.release();
    }
}