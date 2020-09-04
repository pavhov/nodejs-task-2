import * as dotenv from "dotenv";

import CommonStory from "../../lib/abstract/CommonModule";
import ModuleInt   from "../../lib/decorators/ModuleInt";


@ModuleInt
export default class Config extends CommonStory {
    public static params: dotenv.DotenvParseOutput;

    constructor() {
        super();
        Config.params = dotenv.config({
            path: `${process.cwd()}/.env`
        } as dotenv.DotenvConfigOptions).parsed;
    }

    async context(): Promise<void> {
        return Promise.resolve(undefined);
    }

    async destroy(): Promise<void> {
        return Promise.resolve(undefined);
    }
}
