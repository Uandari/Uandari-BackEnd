export class CategoryModel {
  idCategory?: number;
  name: string;
  description: string;

  constructor(name: string, description: string, idCategory?: number) {
    this.idCategory = idCategory;
    this.name = name;
    this.description = description;
  }
}
