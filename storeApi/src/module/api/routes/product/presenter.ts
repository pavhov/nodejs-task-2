import { Delete, Get, Post, Presenter } from "../../../../lib/decorators/Koa";

import { ProductStory } from "./story";
import { ImageStory }   from "../image/story";
import Amqp1            from "../../../amqp/amqp1";

@Presenter({path: "/product"})
export default class ProductPresenter {
    private stories: { [p: string]: any } = {};

    constructor() {
        this.stories = {
            image: new ImageStory(),
            product: new ProductStory(),
        };


    }

    @Get({path: "/:product_id/image"})
    getImage() {
    }

    @Post({path: "/:product_id/image"})
    storeImage() {
    }

    @Delete({path: "/:product_id/image"})
    deleteImage() {
    }

    @Get({path: "/:product_id/image/:size"})
    getImageBySize() {
    }

}
