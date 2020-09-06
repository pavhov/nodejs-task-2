import rhea from "rhea";

import Config      from "../system/Config";
import ModuleInt   from "../../lib/decorators/ModuleInt";
import CommonStory from "../../lib/abstract/CommonModule";

@ModuleInt
export default class Amqp1 extends CommonStory {
    private static _instance: Amqp1;
    private readonly _options: rhea.ConnectionOptions;
    private _senderConnection: rhea.Connection;
    private _receiverConnection: rhea.Connection;
    private _sender: rhea.Sender;
    private _receiver: rhea.Receiver;

    public constructor() {
        super();
        if (Amqp1.instance) {
            throw Error("QMQP.1 already initialized");
        }
        Amqp1.instance = this;
        this._options = {
            host: Config.params["queue_host"],
            port: parseInt(Config.params["queue_port"]),
            username: Config.params["queue_user"],
            password: Config.params["queue_pass"],
            reconnect: true,
            reconnect_limit: 10,
        };
    }

    protected async context(): Promise<void> {
        const [_senderOptions, _receiverOptions] = [
            {...this._options, container_id: "_senderConnection"},
            {...this._options, container_id: "_receiverConnection"}
        ];
        this._senderConnection = rhea.connect(_senderOptions);
        this._receiverConnection = rhea.connect(_receiverOptions);

    }

    public async setup(senderOptions: rhea.SenderOptions, receiverOptions: rhea.ReceiverOptions) {
        const sender = this._senderConnection.open_sender(senderOptions);
        const receiver = this._receiverConnection.open_receiver(receiverOptions);

        return {sender, receiver};
    }

    protected async destroy(): Promise<void> {
        return Promise.resolve(undefined);
    }

    static get instance(): Amqp1 {
        return this._instance;
    }

    static set instance(value: Amqp1) {
        this._instance = value;
    }

    get receiver(): rhea.Receiver {
        return this._receiver;
    }

    set receiver(value: rhea.Receiver) {
        this._receiver = value;
    }

    get sender(): rhea.Sender {
        return this._sender;
    }

    set sender(value: rhea.Sender) {
        this._sender = value;
    }

}
