import Jimp      from "jimp";
import sequelize from "sequelize";

import ProductTask from "../../../repository/product/Task";
import StoreTask   from "../../../repository/store/Task";
import IProduct    from "../../../repository/product/IProduct";
import IStore      from "../../../repository/store/IStore";
import path        from "path";

export default class ProductWatermarkStory {
    private _productTask: ProductTask;
    private _storeTask: StoreTask;
    private readonly _queueData: IProduct;

    public constructor(queueData: IProduct) {
        this._productTask = ProductTask.Instance();
        this._storeTask = StoreTask.Instance();
        this._queueData = queueData;

    }

    public async run() {
        const store: IStore = await this._storeTask.getOne(
            {
                Id: this._queueData.StoreId,
                WatermarkImage: {
                    [sequelize.Op.not]: null
                }
            },
            ["WatermarkImage"],
        );

        if (store) {
            await ProductWatermarkStory.build(store.WatermarkImage, this._queueData);
        }
    }

    public static async build(watermarkData: IStore["WatermarkImage"], product: IProduct) {
        let large: Jimp, medium: Jimp, logo: Jimp;
        const logoMarginPercentage = 2;
        const imageData = product.Image;

        if (!imageData) {
            return;
        }

        try {
            [imageData["large_c"], imageData["medium_c"]] = [
                imageData["large"].replace("large", "large_c"),
                imageData["medium"].replace("medium", "medium_c")
            ];
            [large, medium] = [await Jimp.read(imageData["large"]), await Jimp.read(imageData["medium"])];
            [large, medium] = [await large.write(imageData["large_c"]), await medium.write(imageData["medium_c"])];
            [large["path"], medium["path"]] = [imageData["large_c"], imageData["medium_c"]];
        } catch (e) {
            console.log(`Image not loaded ${imageData}`, e);
        }

        try {
            logo = await Jimp.read(await watermarkData["path"]);
        } catch (e) {
            console.log(`Logo not loaded ${imageData}`, e);
        }


        if (logo && large && medium) {
            const images = [large, medium];
            await Promise.all(images.map(async image => {
                logo.resize(image.bitmap.width / 10, Jimp.AUTO);

                const xMargin = (image.bitmap.width * logoMarginPercentage) / 100;
                const yMargin = (image.bitmap.width * logoMarginPercentage) / 100;

                const X = image.bitmap.width - logo.bitmap.width - xMargin;
                const Y = image.bitmap.height - logo.bitmap.height - yMargin;

                const result: Jimp = image.composite(logo, X, Y, {
                    mode: Jimp.BLEND_OVERLAY,
                    opacitySource: 0.4,
                    opacityDest: 1
                });

                await result.write(image["path"]);
            }));

        }

    }

}
