import CommonStory from "../../lib/abstract/CommonModule";
import ModuleInt   from "../../lib/decorators/ModuleInt";

@ModuleInt
export default class Listener extends CommonStory {
    constructor() {
        super();
    }

    async context(): Promise<void> {
        return Promise.resolve(undefined);
    }

    async destroy(): Promise<void> {
        return Promise.resolve(undefined);
    }
}
