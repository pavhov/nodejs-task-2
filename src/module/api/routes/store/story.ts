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

    public async getOne(): Promise<any> {
        const store = await this.getOne();
        return Promise.resolve(store);
    }

    public async createOne(): Promise<any> {
        const store = await this.getOne();
        return Promise.resolve(store);
    }

    public async updateOne(): Promise<any> {
        const store = await this.getOne();
        return Promise.resolve(store);
    }

    public async removeOne(): Promise<any> {
        const store = await this.getOne();
        return Promise.resolve(store);
    }
}
