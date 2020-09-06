import { ProductStory } from "./story";

export default class StoreAccessor {
    private stories: { [p: string]: any } = {};

    private readonly _options: any;

    constructor() {
        this.stories = {
            store: new ProductStory(),
        };

    }

    protected async before(context: any, next: any): Promise<any> {
        const result = await this.stories.store.getOne({Id: context.request.params.product}, ["Id", "Image"]);
        context.state.product = result;
        await context.assert(result, 401, "Wrong product!");
        await next();
    }

    protected async after(context: any, next: any): Promise<any> {
        context.throw(404)
    }
}
