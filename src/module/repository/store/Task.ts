import StaticModuleInIt  from "../../../lib/decorators/StaticModuleInIt";
import CommonStaticStory from "../../../lib/abstract/CommonStaticStory";

import Model             from "./Model";


@StaticModuleInIt
export default class Task extends CommonStaticStory {
    private static _instance: Task;

    static Instance(): Task {
        if (!Task._instance) {
            Task._instance = new Task();
        }

        return Task._instance;
    }

    constructor() {
        super();
        this._model = Model;
        this._attributes = this._model.fieldSet;
    }
}
