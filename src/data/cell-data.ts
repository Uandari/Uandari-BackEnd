import { OracleHelper } from "../handlers/OracleHelper";
import { CellModel } from "../common/entities/CellModel";
import { ResultVW } from "../common/api-interfaces/result";
import { CELL_PROCEDURES } from "../common/enums/stored-procedures";
import { StatusCodes } from "../common/enums/enums";

//Get all cells using Oracle procedure
export async function getCellsOracle(): Promise<ResultVW> {
  const db = await new OracleHelper().createConnection();
  try {
    const query = `${CELL_PROCEDURES.GET_CELLS}`;
    const result = await db.execute(query);

    if (!result.rows) {
      throw new Error("Query result rows are undefined");
    }
    const cells: CellModel[] = result.rows.map((row: any) => ({
      idCell: row[0],
      cellName: row[1],
      idUser: row[2],
      idLine: row[3],
    }));

    if (cells.length === 0) {
      return new ResultVW(
        "There are no cells to show",
        StatusCodes.NO_CONTENT,
        cells
      );
    }
    return new ResultVW("successfully extracted cells", StatusCodes.OK, cells);
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
    const {cellName, idUser, idLine} = cell;
    const query = `BEGIN
    ${CELL_PROCEDURES.INSERT_CELL}(
        '${cellName}',
        ${idUser},
        ${idLine}
    );
    END;`;
    await db.execute(query);
    const cellResult: ResultVW = new ResultVW(
      "Cell created",
      StatusCodes.OK,
      cell
    );
    return cellResult;
  } catch (error) {
    throw error;
  }
}