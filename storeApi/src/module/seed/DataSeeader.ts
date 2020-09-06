import StoreTask   from "../repository/store/Task";
import ProductTask from "../repository/product/Task";

import seed           from "./seed.json";
import JobModuleStory from "../../lib/abstract/JobModuleStory";
import JobModuleInIt  from "../../lib/decorators/JobModuleInIt";

@JobModuleInIt
class DataSeeder extends JobModuleStory {
    private _tasks;

    constructor() {
        super();

        this._tasks = {
            store: StoreTask.Instance(),
            product: ProductTask.Instance()
        };
    }

    protected async start(): Promise<void> {
        for (const name in seed) {
            if (seed.hasOwnProperty(name)) {
                const seedData: [] = seed[name];
                try {
                    await this._tasks[name].model.bulkCreate(seedData, {
                        updateOnDuplicate: ["Id"],
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    protected async stop(): Promise<void> {

    }

}
