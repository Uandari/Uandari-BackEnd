export class LineModel {
    lineName: string;
    idCar?: number;
    idLine?: number;
    carName?: string;
    constructor(lineName: string, idCar?: number, carName?: string, idLine?: number) {
        this.lineName = lineName;
        this.idLine = idLine;
        this.carName = carName;
        this.idCar = idCar;
    }
}