import Task                  from "../../../repository/product/Task";
import IStore                from "../../../repository/store/IStore";
import IProduct              from "../../../repository/product/IProduct";
import ProductWatermarkStory from "../product/ProductWatermarkStory";
import sequelize             from "sequelize";

export default class StoreWatermarkStory {
    private _productTask: Task;
    private readonly _queueData: IStore;

    public constructor(queueData: IStore) {
        this._productTask = Task.Instance();
        this._queueData = queueData;

    }

    public async run() {
        const products: Array<IProduct> = await this._productTask.getList({
                StoreId: this._queueData.Id,
                Image: {
                    [sequelize.Op.not]: null
                }
            },
            ["Image"],
        );

        const wm = this._queueData.WatermarkImage;
        await Promise.all(products.map(async value => await StoreWatermarkStory.build(wm, value)));

    }

    public static async build(watermarkData: IStore["WatermarkImage"], imageData: IProduct) {
        return ProductWatermarkStory.build(watermarkData, imageData);
    }
}
