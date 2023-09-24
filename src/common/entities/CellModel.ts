export class CellModel {
    idCell?: number;
    cellName: string;
    idUser?: number;
    idLine?: number;
    userName?: string;
    lineName?: string;
    constructor(
        cellName: string,
        idUser?: number,
        idLine?: number,
        idCell?: number,
        userName?: string,
        lineName?: string
    ) {
        this.cellName = cellName;
        this.idUser = idUser;
        this.idLine = idLine;
        this.idCell = idCell;
        this.userName = userName;
        this.lineName = lineName;
    }
}