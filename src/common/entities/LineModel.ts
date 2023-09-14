export class LineModel{
    lineName: string;
    idLine?: number;
    constructor(lineName: string, idLine?: number){
        this.lineName = lineName;
        this.idLine = idLine;
    }
}