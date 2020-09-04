import { DataTypes, Model }            from "sequelize";
import { ModelAttributeColumnOptions } from "sequelize/types/lib/model";

export default class StoreModel extends Model {
    public static Id: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        field: "id",
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: true,
            isNumeric: false,
        }
    };

    public static Title: ModelAttributeColumnOptions = {
        type: DataTypes.TEXT({length: "medium"}),
        field: "title",
        allowNull: false,

        validate: {
            notEmpty: true,
        },
    };

    public static WatermarkImage: ModelAttributeColumnOptions = {
        type: DataTypes.JSON,
        field: "watermark_image",
        allowNull: true,

        validate: {
            notEmpty: true,
        }
    };


    public static tableName = "store";
    private static _fieldSet = {
        Id: StoreModel.Id,
        Title: StoreModel.Title,
        WatermarkImage: StoreModel.WatermarkImage,
    };

    static get fieldSet(): {
        Title: ModelAttributeColumnOptions<Model>;
        Id: ModelAttributeColumnOptions<Model>;
        WatermarkImage: ModelAttributeColumnOptions<Model>
    } {
        return this._fieldSet;
    }
}
