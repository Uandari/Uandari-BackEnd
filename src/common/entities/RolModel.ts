export class RolModel {
    idRol?: number;
    nombre: string;

    constructor(
        nombre: string,
        idRol?: number,
      
    ){
        this.idRol = idRol;
        this.nombre = nombre;
    }
}
