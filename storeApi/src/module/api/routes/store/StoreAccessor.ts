import { StoreStory } from "./story";

export default class StoreAccessor {
    private stories: { [p: string]: any } = {};

    private readonly _options: any;

    constructor() {
        this.stories = {
            store: new StoreStory(),
        };

    }

    protected async before(context: any, next: any): Promise<any> {
        const result = await this.stories.store.getOne({Id: context.request.params.store});
        context.state.store = result;
        await context.assert(result, 401, 'Wrong story!');
        await next();
    }

    protected async after(context: any, next: any): Promise<any> {
        await next();
    }
}
