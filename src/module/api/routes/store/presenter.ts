import { Delete, Get, Post, Presenter, Use } from "../../../../lib/decorators/Koa";

import { StoreStory } from "./story";
import FileUpload     from "../image/FileUpload";
import StoreAccessor  from "./StoreAccessor";

@Presenter({path: "/store"})
export default class StorePresenter {
    private stories: { [p: string]: any } = {};

    constructor() {
        this.stories = {
            store: new StoreStory(),
        };

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

    @Post({path: "/:store/watermark"})
    @Use(StoreAccessor)
    @Use(FileUpload)
    async storeOne(context: any, next: any) {
        const assert = await this.stories.store.storeOneWatermark({Id: context.state.store.Id}, context.state.file);
        await context.assert(assert[0], 400, "wrong");
        context.status = 200;
        const result = await this.stories.store.getOne({Id: context.state.store.Id}, ["Title", "WatermarkImage",]);
        result.WatermarkImage = {
            name: result.WatermarkImage.name,
        };
        context.body = result;
    }

    @Delete({path: "/:store/watermark"})
    async deleteOne(context: any, next: any) {
        const assert = await this.stories.store.storeOneWatermark({Id: context.state.store.Id}, {});
        await context.assert(assert[0], 400, "wrong");
        context.status = 200;
        const result = await this.stories.store.getOne({Id: context.state.store.Id}, ["Title", "WatermarkImage",]);
        result.WatermarkImage = {
            name: result.WatermarkImage.name,
        };
        context.body = result;
    }

}
