export default class GameServer {
    constructor() {
        this.clients = {};

        const WebSocketServer = new require('ws');
        const webSocketServer = new WebSocketServer.Server({
            port: 8081
        });

        const thiz = this;

        webSocketServer.on('connection', function (ws) {
            const id = Math.random();

            thiz.clients[id] = ws;
            ws.on('message', (message) => this.onmessage({id, message}));
            ws.on('close', () => delete thiz.clients[id]);
        });
    }

    set onMessage(onmessage) {
        this.onmessage = onmessage;
    }

    sendAll(message) {
        for (const key in this.clients) {
            this.clients[key].send(message);
        }
    }
}