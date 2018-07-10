import uuidv4 from "uuid/v4";
import WebSocketServer from "ws";

export default class GameServer {
    constructor() {
        this.clients = {};

        const webSocketServer = new WebSocketServer.Server({
            port: 8081
        });

        const thiz = this;

        webSocketServer.on('connection', function (ws) {
            const id = uuidv4();

            console.log(`User connected ${id}`);

            thiz.clients[id] = ws;
            thiz.onconnection(id);
            ws.on('message', (message) => {
                if (thiz.onmessage) {
                    thiz.onmessage({
                        id: id,
                        data: JSON.parse(message)
                    });
                }
            });
            ws.on('close', () => delete thiz.clients[id]);
        });
    }

    set onConnection(onconnection) {
        this.onconnection = onconnection;
    }

    set onMessage(onmessage) {
        this.onmessage = onmessage;
    }

    sendAll(message) {
        for (const key in this.clients) {
            this.clients[key].send(JSON.stringify(message));
        }
    }
}