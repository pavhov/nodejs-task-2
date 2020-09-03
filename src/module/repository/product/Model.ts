import { DataTypes, Model as BaseModel } from "sequelize";
import { ModelAttributeColumnOptions }   from "sequelize/types/lib/model";

export default class Model extends BaseModel {
    public static Id: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        field: "id",
        allowNull: false,
        primaryKey: true,
    };

    public static StoreId: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        field: "store_id",
        allowNull: false,
    };

    public static Title: ModelAttributeColumnOptions = {
        type: DataTypes.TEXT({length: "medium"}),
        field: "title",
        allowNull: false,
    };

    public static Image: ModelAttributeColumnOptions = {
        type: DataTypes.TEXT({length: "medium"}),
        field: "image",
        allowNull: true,
    };

    public static tableName = "product";
    public static fieldSet = {
        Id: Model.Id,
        StoreId: Model.StoreId,
        Title: Model.Title,
    };

}
