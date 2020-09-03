import { Sequelize }        from "sequelize";
import { Dialect, Options } from "sequelize/types/lib/sequelize";

import ModuleInt    from "../../../../lib/decorators/ModuleInt";
import CommonModule from "../../../../lib/abstract/CommonModule";
import Config       from "../../../system/Config";

export default class MysqlDataSource extends CommonModule {
    private static _instance: MysqlDataSource;

    private readonly _options: Options;
    private readonly _connector: Sequelize;

    constructor() {
        super();
        this._options = {
            dialect: Config.params["db_dialect"] as Dialect,
            host: Config.params["db_host"],
            port: parseInt(Config.params["db_port"]),
            username: Config.params["db_user"],
            password: Config.params["db_pass"],
            database: Config.params["db_name"],
            logging: true,
        };
        this._connector = new Sequelize(this._options);
        if (MysqlDataSource._instance) {
            MysqlDataSource._instance = this;
        }
    }

    protected async context(): Promise<void> {
        await this._connector.authenticate();
        await this._connector.sync({});
        console.log(`Dialect started on ${this._options.dialect}://${this._options.host}:${this._options.port}/${this._options.database}`);
        return Promise.resolve(undefined);
    }

    protected async destroy(): Promise<void> {
        await this._connector.close();
        return Promise.resolve(undefined);
    }

    public get connector() {
        return this._connector;
    }

    public set connector(connector) {

    }

    public static get instance() {
        return this._instance;
    }

    public static set instance(instance) {

    }

}
