import send        from "koa-send";
import { Message } from "rhea";

import { Delete, Get, Post, Presenter, Use } from "../../../../lib/decorators/Koa";

import { StoreStory } from "./story";
import FileUpload     from "../image/FileUpload";
import StoreAccessor  from "./StoreAccessor";

import StoreWatermarkQueue from "../../../amqp/queue/store/StoreWatermarkQueue";

@Presenter({path: "/store"})
export default class StorePresenter {
    private readonly cwd: string;
    private stories: { store: StoreStory, queue: StoreWatermarkQueue };

    constructor() {
        this.stories = {
            store: new StoreStory(),
            queue: StoreWatermarkQueue.instance,
        };
        setImmediate(() => this.stories.queue = StoreWatermarkQueue.instance);
        this.cwd = process.cwd();
    }

    @Get({path: "/:store/watermark"})
    @Use(StoreAccessor)
    async getOne(context: any, next: any) {
        const result = context.state.store;
        result.WatermarkImage = {
            name: result.WatermarkImage.name,
        };
        context.body = result;
    }

    @Get({path: "/:store/watermark/show"})
    @Use(StoreAccessor)
    async showOne(context: any, next: any) {
        if (!context.state.store.WatermarkImage) {
            return await next();
        }
        await send(context, context.state.store.WatermarkImage.path.replace(this.cwd, ""), {root: this.cwd});
    }

    @Post({path: "/:store/watermark"})
    @Use(StoreAccessor)
    @Use(FileUpload)
    async storeOne(context: any, next: any) {
        const assert = await this.stories.store.storeOneWatermark({Id: context.state.store.Id}, context.state.file);
        await context.assert(assert[0], 400, "wrong");
        context.status = 200;
        await this.stories.store.removeOneImage(context.state.store.WatermarkImage);
        const result = await this.stories.store.getOne({Id: context.state.store.Id}, ["Id", "Title", "WatermarkImage",]);
        this.stories.queue.senderContext.sender.send({body: result} as Message);
        result.WatermarkImage = {
            name: result.WatermarkImage.name,
        };
        context.body = result;
    }

    @Delete({path: "/:store/watermark"})
    @Use(StoreAccessor)
    async deleteOne(context: any, next: any) {
        const assert = await this.stories.store.storeOneWatermark({Id: context.state.store.Id}, {});
        await context.assert(assert[0], 400, "wrong");
        context.status = 200;
        const result = await this.stories.store.getOne({Id: context.state.store.Id}, ["Id", "Title", "WatermarkImage",]);
        this.stories.queue.senderContext.sender.send({body: result} as Message);
        result.WatermarkImage = {
            name: result.WatermarkImage.name,
        };
        context.body = result;
    }

}
