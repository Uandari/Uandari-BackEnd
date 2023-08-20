export class RoleModel {
    idRole?: number;
    name: string;

    constructor(
        name: string,
        idRole?: number,
      
    ){
        this.idRole = idRole;
        this.name = name;
    }
}
