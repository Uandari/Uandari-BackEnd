import { OracleHelper } from "../handlers/OracleHelper";
import { CategoryModel } from "../common/entities/CategoryModel";
import { ResultVW } from "../common/api-interfaces/result";
import { CATEGORY_PROCEDURES } from "../common/enums/stored-procedures";
import { StatusCodes } from "../common/enums/enums";

//Get all categories using oracle procedure
export async function getCategoriesOracle(): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try{
        const query = `${CATEGORY_PROCEDURES.GET_CATEGORIES}`;
        const result = await db.execute(query);
        if (!result.rows){
            throw new Error("Query result rows are undefined");
        }
        const categories: CategoryModel[] = result.rows.map((category:any)=> ({
            idCategory: category[0],
            name: category[1],
            categoryType: category[2],
            description: category[3]
        }));
        if (categories.length === 0){
            return new ResultVW(
                "There are no categories to display",
                StatusCodes.NO_CONTENT,
                categories
            );
        }
        return new ResultVW("Categories Found",StatusCodes.OK,categories);
    } catch (error){
        throw error;
    }finally{
        db.close()
    }
}

//verify if a category exists using oracle
export async function verifyCategoryExistsOracle(idCategory: number): Promise<Boolean>{
    const db = await new OracleHelper().createConnection();
    try {
        const query = `${CATEGORY_PROCEDURES.GETBYID} ${idCategory}`;
        const result: any = await db.execute(query);
        return result.rows && result.rows.length > 0;
    } catch (error) {
        throw error;
    }finally{
        db.close();
    }
}

//get user by id using oracle
export async function getCategoryByIdOracle(idCategory: number): Promise<ResultVW>{
    const db = await new OracleHelper().createConnection();
    try {
        if(!(await verifyCategoryExistsOracle(idCategory))){
            return new ResultVW("Category Not Found", StatusCodes.NOT_FOUND, []);
        }
        const query = `${CATEGORY_PROCEDURES.GETBYID} ${idCategory}`;
        const result: any = await db.execute(query);
        const category: CategoryModel = result.rows.map((row: any)=>({
            idCategory: row[0],
            name: row[1],
            categoryType: row[2],
            description: row[3]
        }));
        return new ResultVW("Category Found", StatusCodes.OK, category);
    } catch (error) {
        throw error;
    }finally{
        db.close();
    }
}