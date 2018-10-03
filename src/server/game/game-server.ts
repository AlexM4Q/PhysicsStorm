import {createServer, Server} from "http";
import SocketIO, {Socket} from "socket.io";
import {WS_PORT} from "../../shared/constants";
import {Application} from "express";
import Logger from "../../shared/logging/logger";
import ConsoleLogger from "../../shared/logging/console-logger";
import EntityFactory from "../../shared/game/entities/entity-factory";
import TYPES from "../../shared/inversify.types";

export default class GameServer {

    private static readonly log: Logger = new ConsoleLogger(GameServer);

    private readonly server: Server;
    private readonly io: SocketIO.Server;

    private readonly _clients: { [id: string]: Socket };
    private onconnection: any;
    private onmessage: any;
    private onclose: any;

    constructor(app: Application) {
        this._clients = {};

        this.server = createServer(app);
        this.io = SocketIO(this.server);

        this.server.listen(WS_PORT);

        const thiz = this;

        this.io.on("connect", socket => {
            socket.on("register-request", (id) => {
                if (!id) {
                    id = EntityFactory.newGuidTyped(TYPES.Player);
                    socket.emit("register-response", id);

                    GameServer.log.debug(`Registered new player ${id}`);
                }

                thiz._clients[id] = socket;
                thiz.onconnection(id);

                socket.on("message", (message: any) => {
                    thiz.onmessage({
                        id: id,
                        data: message
                    });
                });

                socket.on("disconnect", () => {
                    thiz._clients[id].disconnect(true);
                    delete thiz._clients[id];
                    thiz.onclose(id);
                    this.sendAll({
                        type: "delete",
                        id: id
                    });
                });
            });
        });
    }

    set onConnection(onconnection: any) {
        this.onconnection = onconnection;
    }

    set onMessage(onmessage: any) {
        this.onmessage = onmessage;
    }

    set onClose(onclose: any) {
        this.onclose = onclose;
    }

    public sendAll(message: any): void {
        for (const id in this._clients) {
            if (this._clients.hasOwnProperty(id)) {
                this._clients[id].emit("message", message);
            }
        }
    }
}