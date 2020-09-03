import Koa from "koa";

import CommonStory from "../../lib/abstract/CommonModule";
import ModuleInt   from "../../lib/decorators/ModuleInt";
import Config      from "../system/Config";
import { KoaApi }  from "../../lib/decorators/Koa";

@ModuleInt
@KoaApi({path: "/task"})
export default class Http extends CommonStory {
    private koa: Koa.DefaultContext;
    private readonly ip: string;
    private readonly port: number;

    public constructor() {
        super();

        this.ip = Config.params["http_ip"];
        this.port = parseInt(Config.params["http_port"]);
    }

    protected async context(): Promise<void> {
        this.koa.listen(this.port, this.ip, (...args) => {
            console.log(`Koa listening on http://${this.ip}:${this.port}`);
        });
        return Promise.resolve(undefined);
    }

    protected async destroy(): Promise<void> {
        return Promise.resolve(undefined);
    }
}
