import DataSource                              from "../../module/db/dialect/base/DataSource";
import { InitOptions, Model, ModelAttributes } from "sequelize";
import { ModelValidateOptions }                from "sequelize/types/lib/model";

export default abstract class CommonStaticStory {

    protected _model: any | Model;

    protected _attributes: ModelAttributes<import("sequelize/types").Model<any, any>, any>;
    protected _options: InitOptions<import("sequelize/types").Model<any, any>>;

    public init() {
        this._options = {
            sequelize: DataSource.instance.default.connector,
            tableName: this._model.tableName,
        };
        this._model.init(this._attributes, this._options);
    }

    get model(): any {
        return this._model;
    }

}
