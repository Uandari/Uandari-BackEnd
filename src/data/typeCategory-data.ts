import { OracleHelper } from "../handlers/OracleHelper";
import { TypeCategoryModel } from "../common/entities/TypeCategoryModel";
import { ResultVW } from "../common/api-interfaces/result";
import { TYPECATEGORY_PROCEDURES } from "../common/enums/stored-procedures";
import { StatusCodes } from "../common/enums/enums";

//Get all Types Categories using Oracle Procedures
export async function getTypeCategoriesOracle(): Promise<ResultVW> {
    const db = await new OracleHelper().createConnection();
    try {
        const query = `${TYPECATEGORY_PROCEDURES.GET_TYPECATEGORIES}`;
        const result = await db.execute(query);
        if(!result.rows){
            throw new Error("Query result rows are undefined")
        }
        const TypeCategories: TypeCategoryModel[] = result.rows.map((TypeCategory: any) => ({
            idTypeCategory: TypeCategory[0],
            categoryType: TypeCategory[1],
            idCategory: TypeCategory[2]
        }));
        if (TypeCategories.length === 0){
            return new ResultVW(
                "There are no categories to show",
                StatusCodes.NO_CONTENT,
                TypeCategories
            );
        }
        return new ResultVW("TypeCategories Found", StatusCodes.OK, TypeCategories);
    } catch (error) {
        throw error;
    } finally{
        db.close();
    }
};

//Verify if a TypeCategory exists using Oracle
export async function verifyTypeCategoryExistsOracle(idTypeCategory: number): Promise<Boolean>{
    const db = await new OracleHelper().createConnection();
    try {
        const query = `${TYPECATEGORY_PROCEDURES.GETBYID} ${idTypeCategory}`;
        const result: any = await db.execute(query);
        return result.rows && result.rows.length > 0;
    } catch (error) {
        throw error;
    } finally {
        db.close()
    }
};

//Get TypeCategory by id using Oracle
export async function getTypeCategoryByIdOracle(idTypeCategory: number): Promise<ResultVW>{
    const db = await new OracleHelper().createConnection();
    try {
        if (!(await verifyTypeCategoryExistsOracle(idTypeCategory))) {
            return new ResultVW("TypeCategory not found", StatusCodes.NOT_FOUND, []);
        }
        const query = `${TYPECATEGORY_PROCEDURES.GETBYID} ${idTypeCategory}`;
        const result: any = await db.execute(query);
        const typeCategory: TypeCategoryModel = result.rows.map((row: any) => ({
          idTypeCategory: row[0],
          categoryType: row[1],
          idCategory: row[2]
        }));
        return new ResultVW("Category Type found", StatusCodes.OK, typeCategory);
    } catch (error) {
        throw error;
    } finally{
        db.close()
    }
};