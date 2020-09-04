import rhea from "rhea";

import ModuleInt   from "../../../../lib/decorators/ModuleInt";
import CommonStory from "../../../../lib/abstract/CommonModule";
import Amqp1       from "../../amqp1";

import ProductWatermarkStory from "./ProductWatermarkStory";

@ModuleInt
export default class ProductWatermarkQueue extends CommonStory {
    private static _instance: ProductWatermarkQueue;

    private _senderContext: rhea.EventContext;
    private _receiverContext: rhea.EventContext;

    constructor() {
        super();

        if (ProductWatermarkQueue.instance) {
            throw Error("ProductWatermark already initialized");
        }
        ProductWatermarkQueue.instance = this;
    }

    protected async context(): Promise<void> {
        const receiver = Amqp1.instance.receiver;
        const sender = Amqp1.instance.sender;

        await new Promise((resolve, reject) => {
            receiver
                .on("receiver_error", (...args) => reject(...args))
                .on("receiver_close", (...args) => reject(...args))
                .on("receiver_open", (context: rhea.EventContext) => this.receiverContext = context)
                .on("message", (context: rhea.EventContext) => this.contextMessage(context));
            sender
                .on("session_error", (...args) => reject(...args))
                .on("session_close", (...args) => reject(...args))
                .on("sender_open", (...args) => resolve(...args))
                .on("sendable", (context: rhea.EventContext) => this.senderContext = context);
        });
    }

    protected async destroy(): Promise<void> {
        return Promise.resolve(undefined);
    }

    private contextMessage(context: rhea.EventContext) {
        try {
            console.log(context.message.body);
            (new ProductWatermarkStory(context.message.body)).run();
            context.delivery.accept();
        } catch (e) {
            console.error("Message rejected ", e);
            context.delivery.reject();
        }
    }

    static get instance(): ProductWatermarkQueue {
        return this._instance;
    }

    static set instance(value: ProductWatermarkQueue) {
        this._instance = value;
    }

    get receiverContext(): rhea.EventContext {
        return this._receiverContext;
    }

    set receiverContext(value: rhea.EventContext) {
        this._receiverContext = value;
    }

    get senderContext(): rhea.EventContext {
        return this._senderContext;
    }

    set senderContext(value: rhea.EventContext) {
        this._senderContext = value;
    }

}
