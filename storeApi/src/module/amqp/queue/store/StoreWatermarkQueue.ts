import rhea from "rhea";

import ModuleInt   from "../../../../lib/decorators/ModuleInt";
import CommonStory from "../../../../lib/abstract/CommonModule";
import Amqp1       from "../../amqp1";

import StoreWatermarkStory from "./StoreWatermarkStory";

@ModuleInt
export default class StoreWatermarkQueue extends CommonStory {
    private static _instance: StoreWatermarkQueue;

    private _senderContext: rhea.EventContext;
    private _receiverContext: rhea.EventContext;

    constructor() {
        super();

        if (StoreWatermarkQueue.instance) {
            throw Error("ProductWatermark already initialized");
        }
        StoreWatermarkQueue.instance = this;
    }

    protected async context(): Promise<void> {
        const {sender, receiver} = await Amqp1.instance.setup({
            target: {
                address: "/store/changes",
                durable: 2,
            },
            source: {
                address: "/store/changes",
                durable: 2,
            },
            autosettle: false
        }, {
            target: {
                address: "/store/changes",
                durable: 2,
            },
            source: {
                address: "/store/changes",
                durable: 2,
            },
            autoaccept: false,
            autosettle: false
        });

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

    private async contextMessage(context: rhea.EventContext) {
        try {
            await (new StoreWatermarkStory(context.message.body)).run();
            context.delivery.accept();
        } catch (e) {
            console.error("Message rejected ", e);
            context.delivery.reject();
        }
    }

    static get instance(): StoreWatermarkQueue {
        return this._instance;
    }

    static set instance(value: StoreWatermarkQueue) {
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
