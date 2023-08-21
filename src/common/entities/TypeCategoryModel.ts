export class TypeCategoryModel{
    idTypeCategory?: number;
    categoryType: string;
    idCategory: number;

    constructor(
        categoryType: string,
        idCategory: number,
        idTypeCategory?: number
    ){
        this.idTypeCategory = idTypeCategory;
        this.categoryType = categoryType;
        this.idCategory = idCategory;
    }
}