import * as WebSocket from "ws";
import Guid from "../../shared/utils/guid-utils";

export default class GameServer {

    private _clients: any;
    private onconnection: any;
    private onmessage: any;
    private onclose: any;

    constructor() {
        this._clients = {};

        const webSocketServer = new WebSocket.Server({
            port: 8081
        });

        const thiz = this;

        webSocketServer.on('connection', function (ws) {
            const id = Guid.newGuid();

            console.log(`User connected ${id}`);

            thiz._clients[id] = ws;
            thiz.onconnection(id);
            ws.on('message', (message) => {
                console.log(message);
                thiz.onmessage({
                    id: id,
                    data: JSON.parse(message.toString())
                });
            });
            ws.on('close', () => {
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

    sendAll(message) {
        for (const client of this._clients) {
            client.send(JSON.stringify(message));
        }
    }
}