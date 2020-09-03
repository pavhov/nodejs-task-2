import CommonModule    from "../../../../lib/abstract/CommonModule";
import ModuleInt       from "../../../../lib/decorators/ModuleInt";
import MysqlDataSource from "../mysql/DataSource";

@ModuleInt
export default class DataSource extends CommonModule {
    private static _instance: DataSource;

    private readonly _default: MysqlDataSource | any;

    constructor() {
        super();

        this._default = new MysqlDataSource();

        if (!DataSource._instance) {
            DataSource._instance = this;
        }
    }

    protected async context(): Promise<void> {
        await this._default.start();
        return Promise.resolve(undefined);
    }

    protected async destroy(): Promise<void> {
        return Promise.resolve(undefined);
    }

    get default() {
        return this._default;
    }

    set default(value) {

    }

    static get instance(): DataSource {
        return this._instance;
    }

    static set instance(value: DataSource) {

    }

}
