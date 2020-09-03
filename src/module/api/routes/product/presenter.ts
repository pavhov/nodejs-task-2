import { Delete, Get, Post, Presenter } from "../../../../lib/decorators/Koa";
import { ProductStory }                 from "./story";
import { ImageStory }                   from "../image/story";

@Presenter({path: "/product"})
export default class ActionsPresenter {
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
