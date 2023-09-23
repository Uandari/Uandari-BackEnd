export class OperationModel {
    idOperation?: number;
    name: string;
    idCell: number;

    constructor(name: string, idCell: number, idOperation?: number) {
        this.idOperation = idOperation;
        this.name = name;
        this.idCell = idCell;
    }
}