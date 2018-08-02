import {createServer, Server} from "http";
import Guid from "../../shared/utils/guid-utils";
import * as SocketIO from "socket.io";
import {Socket} from "socket.io";
import {WS_PORT} from "../../shared/constants";
import {Application} from "express";

export default class GameServer {

    private readonly server: Server;
    private readonly io: SocketIO.Server;

    private _clients: { [id: string]: Socket };
    private onconnection: any;
    private onmessage: any;
    private onclose: any;

    constructor(app: Application) {
        this._clients = {};

        this.server = createServer(app);
        this.io = SocketIO(this.server);

        this.server.listen(WS_PORT);

        const thiz = this;

        this.io.on('connect', socket => {
            const id = Guid.newGuid();

            console.log(`User connected ${id}`);

            thiz._clients[id] = socket;
            thiz.onconnection(id);

            socket.on('message', (message: any) => {
                console.log(message);
                thiz.onmessage({
                    id: id,
                    data: message
                });
            });

            socket.on('disconnect', () => {
                delete thiz._clients[id];
                thiz.onclose(id);
            });
        });
    }

    set onConnection(onconnection) {
        this.onconnection = onconnection;
    }

    set onMessage(onmessage) {
        this.onmessage = onmessage;
    }

    set onClose(onclose) {
        this.onclose = onclose;
    }

    public sendAll(message): void {
        for (let id in this._clients) {
            if (this._clients.hasOwnProperty(id)) {
                this._clients[id].emit('message', message);
            }
        }
    }
}