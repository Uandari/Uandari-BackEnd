import { OracleHelper } from '../handlers/OracleHelper';
import { CellModel } from '../common/entities/CellModel';
import { ResultVW } from '../common/api-interfaces/result';
import { CELL_PROCEDURES } from '../common/enums/stored-procedures';
import { StatusCodes } from '../common/enums/enums';


//Get all cells using Oracle procedure
export async function getCellsOracle(): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {

    const query = CELL_PROCEDURES.GET_CELLS;
    const result = await db.execute(query);

    if (!result.rows) {
      throw new Error('Query result rows are undefined');
    }

    const cells: CellModel[] = result.rows.map((row: any) => ({
      idCell: row[0],
      cellName: row[1],
      idUser: row[2],
      idLine: row[3],
    }));

    if (cells.length === 0) {
      return new ResultVW(
        'There are no cells to show',
        StatusCodes.NOT_FOUND,
        cells
      );
    }
    return new ResultVW('successfully extracted cells', StatusCodes.OK, cells);
  } catch (error) {
    throw error;
  } finally {
    db.release();
  }
}
//Create a new cell using Oracle procedure
export async function insertCellOracle(cell: CellModel): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const { cellName, idUser, idLine } = cell;
    const query = {
      text: CELL_PROCEDURES.INSERT_CELL,
      values: [
        cellName,
        idUser,
        idLine
      ]
    }
    await db.execute(query.text, query.values);
    const cellResult: ResultVW = new ResultVW(
      'Cell created',
      StatusCodes.OK,
      cell
    );
    return cellResult;
  } catch (error) {
    throw error;
  }
}
//Update cell
export async function updateCellOracle(cell: CellModel): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const { idCell, cellName, idUser, idLine } = cell;

    const query = {
      text: CELL_PROCEDURES.UPDATE_CELL,
      values: [
        idCell,
        cellName,
        idUser,
        idLine
      ]
    }

    await db.execute(query.text, query.values);

    const cellResult: ResultVW = new ResultVW(
      'Cell updated',
      StatusCodes.OK,
      cell
    );
    return cellResult;
  } catch (error) {
    throw error;
  }
}

export async function verifyCellExistsOracle(idCell: number): Promise<boolean> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = {
      text: CELL_PROCEDURES.GETBYID,
      values: [
        idCell
      ]
    }
    const result: any = await db.execute(query.text, query.values);
    return result.rows && result.rows.length > 0;

  } catch (error) {
    throw error;
  } finally {
    db.release();
  }
}

export async function getCellByIdOracle(idCell: number): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = {
      text: CELL_PROCEDURES.GETBYID,
      values: [
        idCell
      ]
    }

    console.log(query);
    const result: any = await db.execute(query.text, query.values);

    if (!result.rows) {
      throw new Error('Query result rows are undefined');
    }
    const cells: CellModel[] = result.rows.map((row: any) => ({
      idCell: row[0],
      cellName: row[1],
      idUser: row[2],
      idLine: row[3],
      isDelete: row[4],
    }));

    if (cells.length === 0) {
      return new ResultVW(
        'There are no cells to show',
        StatusCodes.NOT_FOUND,
        cells
      );
    }
    return new ResultVW('successfully extracted cells', StatusCodes.OK, cells);
  } catch (error) {
    throw error;
  } finally {
    db.release();
  }
}

export async function deleteCellByIdOracle(idCell: number): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();

  try {
    if (!(await verifyCellExistsOracle(idCell))) {
      return new ResultVW('Cell not found', StatusCodes.NOT_FOUND, []);
    }
    const query = {
      text: CELL_PROCEDURES.DELETE_CELL,
      values: [
        idCell
      ]
    }
    console.log(query);
    await db.execute(query.text, query.values);
    const cell = await getCellByIdOracle(idCell);
    const cellResult: ResultVW = new ResultVW(
      'Cell deleted',
      StatusCodes.OK,
      cell.vw
    );
    return cellResult;
  } catch (error) {
    throw error;
  }
}

