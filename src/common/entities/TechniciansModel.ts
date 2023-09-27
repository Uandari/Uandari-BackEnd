export class TechniciansModel {
    idTechnician?: number;
    name: string;
    lastNames: string;
    controlNumber: string;
    idCell: number;
    idLine: number;
    position: string;
    realPosition: string;

    constructor(name: string, lastNames: string, controlNumber: string, idLine: number, idCell: number, position: string, realPosition: string, idTechnician?: number) {
        this.idTechnician = idTechnician;
        this.name = name;
        this.lastNames = lastNames;
        this.controlNumber = controlNumber;
        this.idCell = idCell;
        this.idLine = idLine;
        this.position = position;
        this.realPosition = realPosition;
    }
}