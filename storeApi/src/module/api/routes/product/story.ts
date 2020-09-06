import fs   from "fs";
import path from "path";
import Jimp from "jimp";
import util from "util";

import CommonStory from "../../../../lib/abstract/CommonStory";
import ProductTask from "../../../repository/product/Task";
import IProduct    from "../../../repository/product/IProduct";

const unlinkPromisify = util.promisify(fs.unlink);

export class ProductStory extends CommonStory {
    protected stories: { [p: string]: any } = {};
    protected tasks: { [p: string]: any };

    public constructor() {
        super();

        this.tasks = {
            product: ProductTask.Instance(),
        };
    }

    public getOne(conditions: any, fields: any): Promise<any> {
        return this.tasks.product.getOne(conditions, fields);
    }

    public async createOne(): Promise<any> {
        const product = await this.tasks.store.getOne();
        return Promise.resolve(product);
    }

    public async storeOneImage(conditions: any, update: any): Promise<any> {
        const stock = await this.createImageStock(conditions, update);
        update = {...update, ...stock};
        return this.tasks.product.storeStockImage(conditions, update);
    }

    public async removeOneImage(image: IProduct["Image"]): Promise<any> {
        if (!image) {
            return;
        }
        try {
            await unlinkPromisify(image.original);
            await unlinkPromisify(image.large);
            await unlinkPromisify(image.large.replace("large", "large_c"));
            await unlinkPromisify(image.medium);
            await unlinkPromisify(image.medium.replace("medium", "medium_c"));
            await unlinkPromisify(image.small);
        } catch (e) {
            console.log(e);
        }
    }

    public async createImageStock(conditions: any, update: any) {
        const image = await Jimp.read(update.path);
        const imagePath = path.dirname(update.path);
        let imgSplit = update.path.split(path.sep);
        let imgName = imgSplit[imgSplit.length - 1];

        const {original, large, medium, small} = {
            original: `${imagePath}${path.sep}product${path.sep}${conditions.Id}${path.sep}${imgName}`,
            large: `${imagePath}${path.sep}product${path.sep}${conditions.Id}${path.sep}large_${imgName}`,
            medium: `${imagePath}${path.sep}product${path.sep}${conditions.Id}${path.sep}medium_${imgName}`,
            small: `${imagePath}${path.sep}product${path.sep}${conditions.Id}${path.sep}small_${imgName}`,
        };

        await image.write(original);
        await unlinkPromisify(update.path);
        await image.resize(1024, 768).write(large);
        await image.resize(640, 480).write(medium);
        await image.resize(120, 120).write(small);

        return {original, large, medium, small};
    }
}
