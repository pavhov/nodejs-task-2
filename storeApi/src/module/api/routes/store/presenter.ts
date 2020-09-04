import { Message } from "rhea";

import { Delete, Get, Post, Presenter, Use } from "../../../../lib/decorators/Koa";

import { StoreStory }   from "./story";
import FileUpload       from "../image/FileUpload";
import StoreAccessor    from "./StoreAccessor";
import Amqp1                 from "../../../amqp/amqp1";
import ProductWatermarkQueue from "../../../amqp/queue/product/ProductWatermarkQueue";

@Presenter({path: "/store"})
export default class StorePresenter {
    private stories: { store: StoreStory, queue: ProductWatermarkQueue };

    constructor() {
        this.stories = {
            store: new StoreStory(),
            queue: ProductWatermarkQueue.instance,
        };
        setImmediate(() => this.stories.queue = ProductWatermarkQueue.instance);
    }

    @Get({path: "/:store/watermark"})
    @Use(StoreAccessor)
    async getOne(context: any, next: any) {
        const result = context.state.store;
        this.stories.queue.senderContext.sender.send({body: result} as Message);
        result.WatermarkImage = {
            name: result.WatermarkImage.name,
        };
        context.body = result;

    }

    @Post({path: "/:store/watermark"})
    @Use(StoreAccessor)
    @Use(FileUpload)
    async storeOne(context: any, next: any) {
        const assert = await this.stories.store.storeOneWatermark({Id: context.state.store.Id}, context.state.file);
        await context.assert(assert[0], 400, "wrong");
        context.status = 200;
        const result = await this.stories.store.getOne({Id: context.state.store.Id}, ["Title", "WatermarkImage",]);
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
