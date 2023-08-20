export class TypesCategory{
    idTypesCategory?: number;
    typeCategory: string;
    idCategory: number;

    constructor(
        typeCategory: string,
        idCategory: number,
        idTypesCategory?: number
    ){
        this.idTypesCategory = idTypesCategory;
        this.typeCategory = typeCategory;
        this.idCategory = idCategory;
    }
}