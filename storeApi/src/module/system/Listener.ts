import CommonStory from "../../lib/abstract/CommonModule";
import ModuleInt   from "../../lib/decorators/ModuleInt";

@ModuleInt
export default class Listener extends CommonStory {
    constructor() {
        super();
    }

    async context(): Promise<void> {
        this.p.on("rejectionHandled", (...args) => {
            console.error("rejectionHandled", ...args);
        });
        this.p.on("uncaughtException", (...args) => {
            console.error("uncaughtException", ...args);
        });
        this.p.on("unhandledRejection", (...args) => {
            console.error("unhandledRejection", ...args);
        });
        return Promise.resolve(undefined);
    }

    async destroy(): Promise<void> {
        return Promise.resolve(undefined);
    }
}
