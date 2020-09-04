import CommonStory from "../../../../lib/abstract/CommonStory";
import StoreTask   from "../../../repository/store/Task";
import ProductTask from "../../../repository/product/Task";

export class StoreStory extends CommonStory {
    protected stories: { [p: string]: any } = {};
    protected tasks: { [p: string]: any } = {};

    public constructor() {
        super();

        this.tasks = {
            store: StoreTask.Instance(),
            product: ProductTask.Instance(),
        };
    }

    public getOne(conditions: any, fields: any): Promise<any> {
        return this.tasks.store.getOne(conditions, fields);
    }

    public storeOneWatermark(conditions: any, update: any): Promise<any> {
        return this.tasks.store.storeWatermark(conditions, update);
    }

    public async removeOne(conditions: any, fields: any): Promise<any> {
        const store = await this.getOne(conditions, fields);


    }

}
