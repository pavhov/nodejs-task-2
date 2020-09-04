import Task     from "../../../repository/product/Task";
import IProduct from "../../../repository/product/IProduct";

export default class ProductWatermarkStory {
    private _productTask: Task;
    private readonly _queueData: any;

    public constructor(queueData: IProduct) {
        this._productTask = Task.Instance();
        this._queueData = queueData;

    }

    public run() {
        console.log(this._queueData);
    }

}
