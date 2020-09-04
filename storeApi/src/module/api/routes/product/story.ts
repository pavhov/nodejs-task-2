import CommonStory from "../../../../lib/abstract/CommonStory";
import ProductTask from "../../../repository/product/Task";

export class ProductStory extends CommonStory {
    protected stories: { [p: string]: any } = {};
    protected tasks: { [p: string]: any };

    public constructor() {
        super();

        this.tasks = {
            product: ProductTask.Instance(),
        };
    }

    public async getOne(): Promise<any> {
        const product = await this.tasks.store.getOne();
        return Promise.resolve(product);
    }

    public async createOne(): Promise<any> {
        const product = await this.tasks.store.getOne();
        return Promise.resolve(product);
    }
}
