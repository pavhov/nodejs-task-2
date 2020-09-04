import CommonStory      from "../../../../lib/abstract/CommonStory";
import { ProductStory } from "../product/story";

export class ImageStory extends CommonStory {
    protected repositories: { [p: string]: any } = {};
    protected stories: { [p: string]: any } = {};
    protected tasks: { [p: string]: any } = {};

    public constructor() {
        super();
        this.stories.product = new ProductStory();
    }

    public async getLarge(): Promise<any> {
        const product = await this.getOne();
        return Promise.resolve(product);
    }

    public async getMedium(): Promise<any> {
        const product = await this.getOne();
        return Promise.resolve(product);
    }

    public async getSmall(): Promise<any> {
        const product = await this.getOne();
        return Promise.resolve(product);
    }

    public async createOne(): Promise<any> {
        const product = await this.getOne();
        return Promise.resolve(product);
    }

    public async updateOne(): Promise<any> {
        const product = await this.getOne();
        return Promise.resolve(product);
    }

    private async getOne(): Promise<any> {
        const product = await this.stories.product.getOne();
        return Promise.resolve(product);
    }
}
