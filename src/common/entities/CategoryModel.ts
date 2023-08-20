export class CategoryModel{
    idCategory?: number;
    name: string;
    categoryType: string;
    description: string;

    constructor(
        name: string,
        categoryType: string,
        description: string,
        idCategory?: number
    ){
        this.idCategory = idCategory;
        this.name = name;
        this.categoryType = categoryType;
        this.description = description;
    }
}