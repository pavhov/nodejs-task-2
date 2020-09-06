import send        from "koa-send";
import { Message } from "rhea";

import { Delete, Get, Post, Presenter, Use } from "../../../../lib/decorators/Koa";
import { ProductStory }                      from "./story";
import FileUpload                            from "../image/FileUpload";
import ProductAccessor                       from "./ProductAccessor";
import IProduct                              from "../../../repository/product/IProduct";
import ProductWatermarkQueue                 from "../../../amqp/queue/product/ProductWatermarkQueue";

@Presenter({path: "/product"})
export default class ProductPresenter {
    private readonly cwd: string;
    private readonly imageSizes: Array<string>;
    private stories: { product: ProductStory, queue: ProductWatermarkQueue };

    constructor() {
        this.stories = {
            product: new ProductStory(),
            queue: ProductWatermarkQueue.instance,
        };
        setImmediate(() => this.stories.queue = ProductWatermarkQueue.instance);
        this.cwd = process.cwd();
        this.imageSizes = ["small", "medium", "large"];
    }

    @Get({path: "/:product/image"})
    @Use(ProductAccessor)
    async getImage(context: any, next: any) {
        const result: IProduct = await this.stories.product.getOne({Id: context.state.product.Id}, ["Id", "StoreId", "Title", "Image",]);
        result.Image = {
            name: result.Image.name,
        };
        context.body = result;

    }

    @Get({path: "/:product/image/show"})
    @Use(ProductAccessor)
    async showImage(context: any, next: any) {
        await send(context, context.state.product.Image.large.replace("large", "large_c").replace(this.cwd, ""), {root: this.cwd});
    }

    @Post({path: "/:product/image"})
    @Use(ProductAccessor)
    @Use(FileUpload)
    async storeImage(context: any, next: any) {
        const assert = await this.stories.product.storeOneImage({Id: context.state.product.Id}, context.state.file);
        await context.assert(assert[0], 400, "wrong");
        context.status = 200;
        await this.stories.product.removeOneImage(context.state.product.Image);
        const result: IProduct = await this.stories.product.getOne({Id: context.state.product.Id}, ["Id", "StoreId", "Title", "Image",]);
        this.stories.queue.senderContext.sender.send({body: result} as Message);
        result.Image = {
            name: result.Image.name,
        };
        context.body = result;

    }

    @Delete({path: "/:product/image"})
    async deleteImage(context: any, next: any) {
        const assert = await this.stories.product.storeOneImage({Id: context.state.product.Id}, context.state.file);
        await context.assert(assert[0], 400, "wrong");
        context.status = 200;
        const result: IProduct = await this.stories.product.getOne({Id: context.state.store.Id}, ["Id", "Title", "Image",]);
        this.stories.queue.senderContext.sender.send({body: result} as Message);
        result.Image = {
            name: result.Image.name,
        };
        context.body = result;

    }

    @Get({path: "/:product/image/:size"})
    @Use(ProductAccessor)
    async getImageBySize(context: any, next: any) {
        let replace = context.params.size;

        if (!this.imageSizes.includes(context.params.size)) {
            return next();
        }
        if (context.params.size === "medium" || context.params.size === "large") {
            replace = `${context.params.size}_c`;
        }
        await send(context, context.state.product.Image.large.replace("large", replace).replace(this.cwd, ""), {root: this.cwd});
    }

}
