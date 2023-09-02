export class CellModel {
    idCell?: number;
    cellName: string;
    idUser: number;
    idLine: number;
    constructor(
        cellName: string,
        idUser: number,
        idLine: number,
        idCell?: number
    ){
        this.cellName = cellName;
        this.idUser = idUser;
        this.idLine = idLine;
        this.idCell = idCell;
    }
}