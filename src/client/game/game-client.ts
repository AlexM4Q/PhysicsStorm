import {connect} from "socket.io-client";
import ConsoleLogger from "../../shared/logging/console-logger";
import Logger from "../../shared/logging/logger";
import Vector2 from "../../shared/data/vector2";
import {
    WS_DEV_HOST,
    WS_EVENT_CONNECT,
    WS_EVENT_DISCONNECT,
    WS_EVENT_MESSAGE,
    WS_EVENT_REGISTER_REQUEST,
    WS_EVENT_REGISTER_RESPONSE,
    WS_KEY_DATA,
    WS_KEY_ID,
    WS_KEY_INPUT,
    WS_KEY_INPUT_CLICK,
    WS_KEY_INPUT_JUMP,
    WS_KEY_INPUT_LEFT,
    WS_KEY_INPUT_RIGHT,
    WS_KEY_INPUT_STOP,
    WS_KEY_TIME
} from "../../shared/constants-ws";
import AppUtils from "../utils/app-utils";

export default class GameClient {

    private static readonly log: Logger = new ConsoleLogger(GameClient);

    private static readonly opts: SocketIOClient.ConnectOpts = {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity
    };

    private _id: string;

    private _socket: SocketIOClient.Socket;

    public set onMessage(onMessage: (message: any) => void) {
        this._socket.on(WS_EVENT_MESSAGE, onMessage);
    }

    private _onRegister: (id: string) => void;

    public set onRegister(onRegister: (id: string) => void) {
        this._onRegister = onRegister;
    }

    public connect(): void {
        if (this._socket) {
            this._socket.close();
            delete this._socket;
        }

        const thiz: GameClient = this;

        this._socket = AppUtils.isProd() ? connect(GameClient.opts) : connect(WS_DEV_HOST, GameClient.opts);
        this._socket.on(WS_EVENT_CONNECT, () => {
            GameClient.log.debug("Connected to server");

            thiz._socket.on(WS_EVENT_REGISTER_RESPONSE, (id: string) => {
                GameClient.log.debug(`Registered as ${id}`);

                thiz._id = id;
                thiz._onRegister(id);
            });

            thiz._socket.emit(WS_EVENT_REGISTER_REQUEST, thiz._id);

            thiz._socket.on(WS_EVENT_DISCONNECT, () => {
                GameClient.log.debug("Disconnected from server");
            });
        });
    }

    public right(): void {
        this._sendInput({[WS_KEY_INPUT]: WS_KEY_INPUT_RIGHT});
    }

    public left(): void {
        this._sendInput({[WS_KEY_INPUT]: WS_KEY_INPUT_LEFT});
    }

    public stop(): void {
        this._sendInput({[WS_KEY_INPUT]: WS_KEY_INPUT_STOP});
    }

    public jump(): void {
        this._sendInput({[WS_KEY_INPUT]: WS_KEY_INPUT_JUMP});
    }

    public click(target: Vector2): void {
        this._sendInput({[WS_KEY_INPUT]: WS_KEY_INPUT_CLICK, [WS_KEY_DATA]: target});
    }

    private _sendInput(message: any): void {
        message[WS_KEY_ID] = this._id;
        message[WS_KEY_TIME] = Date.now();
        this._socket.emit(WS_EVENT_MESSAGE, message);
    }

}