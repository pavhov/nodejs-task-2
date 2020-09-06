import fs   from "fs";
import util from "util";

import CommonStory from "../../../../lib/abstract/CommonStory";
import StoreTask   from "../../../repository/store/Task";
import ProductTask from "../../../repository/product/Task";
import Jimp        from "jimp";
import path        from "path";
import IProduct    from "../../../repository/product/IProduct";
import IStore      from "../../../repository/store/IStore";

const unlinkPromisify = util.promisify(fs.unlink);

export class StoreStory extends CommonStory {
    protected stories: { [p: string]: any } = {};
    protected tasks: { [p: string]: any } = {};

    public constructor() {
        super();

        this.tasks = {
            store: StoreTask.Instance(),
            product: ProductTask.Instance(),
        };
    }

    public getOne(conditions: any, fields: any): Promise<any> {
        return this.tasks.store.getOne(conditions, fields);
    }

    public async storeOneWatermark(conditions: any, update: any): Promise<any> {
        await this.createImage(conditions, update);
        return this.tasks.store.storeWatermark(conditions, update);
    }

    public async removeOne(conditions: any, fields: any): Promise<any> {
        const store = await this.getOne(conditions, fields);
    }

    public async createImage(conditions: any, update: any) {
        const image = await Jimp.read(update.path);
        const imagePath = path.dirname(update.path);
        let imgSplit = update.path.split(path.sep);
        let imgName = imgSplit[imgSplit.length - 1];

        if (image) {
            const imageNewPath = `${imagePath}${path.sep}store${path.sep}${path.sep}${conditions.Id}${path.sep}${imgName}`;

            await image.write(imageNewPath);
            await unlinkPromisify(update.path);

            update.path = imageNewPath;

            return update;
        }
    }

    public async removeOneImage(image: IStore["WatermarkImage"]) {
        if (!image) {
            return;
        }
        try {
            await unlinkPromisify(image.path);
        } catch (e) {
            console.log(e);
        }
    }
}
