import * as http from "http";
import SocketIO, {Socket} from "socket.io";
import {
    WS_EVENT_CONNECT,
    WS_EVENT_DISCONNECT,
    WS_EVENT_MESSAGE,
    WS_EVENT_REGISTER_REQUEST,
    WS_EVENT_REGISTER_RESPONSE,
    WS_KEY_ID,
    WS_KEY_TYPE,
    WS_KEY_TYPE_REMOVE
} from "../../shared/constants-ws";
import Logger from "../../shared/logging/logger";
import ConsoleLogger from "../../shared/logging/console-logger";
import EntityFactory from "../../shared/game/entities/entity-factory";
import TYPES from "../../shared/inversify.types";

export default class GameServer {

    private static readonly log: Logger = new ConsoleLogger(GameServer);

    // private readonly _server: Server;

    private readonly _io: SocketIO.Server;

    private readonly _clients: { [id: string]: Socket };

    private _onConnection: (id: string) => void;

    public set onConnection(onConnection: (id: string) => void) {
        this._onConnection = onConnection;
    }

    private _onMessage: (message: string) => void;

    public set onMessage(onMessage: (message: string) => void) {
        this._onMessage = onMessage;
    }

    private _onClose: (id: string) => void;

    public set onClose(onClose: (id: string) => void) {
        this._onClose = onClose;
    }

    constructor(httpServer: http.Server) {
        this._clients = {};

        // this._server = httpServer;
        this._io = SocketIO(httpServer);

        // this._server.listen(8000);

        const thiz = this;

        this._io.on(WS_EVENT_CONNECT, (socket: Socket) => {
            socket.on(WS_EVENT_REGISTER_REQUEST, (id: string) => {
                if (!id) {
                    id = EntityFactory.newGuidTyped(TYPES.Player);
                    socket.emit(WS_EVENT_REGISTER_RESPONSE, id);

                    GameServer.log.debug(`Registered new player ${id}`);
                }

                thiz._clients[id] = socket;
                thiz._onConnection(id);

                socket.on(WS_EVENT_MESSAGE, (message: any) => {
                    message[WS_KEY_ID] = id;
                    thiz._onMessage(message);
                });

                socket.on(WS_EVENT_DISCONNECT, () => {
                    thiz._clients[id].disconnect(true);
                    delete thiz._clients[id];
                    thiz._onClose(id);
                    thiz.sendAll({
                        [WS_KEY_ID]: id,
                        [WS_KEY_TYPE]: WS_KEY_TYPE_REMOVE
                    });

                    GameServer.log.debug(`Unregistered player ${id}`);
                });
            });
        });
    }

    public sendAll(message: object): void {
        for (const id in this._clients) {
            if (this._clients.hasOwnProperty(id)) {
                this._clients[id].emit(WS_EVENT_MESSAGE, message);
            }
        }
    }
}