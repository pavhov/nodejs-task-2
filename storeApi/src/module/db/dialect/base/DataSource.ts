import CommonModule, { staticModules } from "../../../../lib/abstract/CommonModule";
import MysqlDataSource                 from "../mysql/DataSource";
import ModuleInt                       from "../../../../lib/decorators/ModuleInt";

@ModuleInt
export default class DataSource extends CommonModule {
    private static _instance: DataSource;

    private readonly _default: MysqlDataSource | any;

    constructor() {
        super();

        this._default = new MysqlDataSource();
        this.staticModules = staticModules;

        if (!DataSource._instance) {
            DataSource._instance = this;
        }
    }

    protected async context(): Promise<void> {
        await Promise.all(this.staticModules.map(async (value: any) => value.Instance().init()));
        await this._default.init();
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
