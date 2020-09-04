import { Model }                        from "sequelize";
import { InitOptions, ModelAttributes } from "sequelize/types/lib/model";

export default abstract class CommonSingleton<T extends any> extends Model {
}
