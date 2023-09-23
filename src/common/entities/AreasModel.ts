export class AreasModel {
    idArea?: number;
    name: string;

    constructor(name: string, idArea?: number) {
        this.idArea = idArea;
        this.name = name;

    }
}