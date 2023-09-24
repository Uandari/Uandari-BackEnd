export class CarModel {
    idCar?: number;
    name: string;

    constructor(name: string, id?: number,) {
        this.idCar = id;
        this.name = name;
    }
}