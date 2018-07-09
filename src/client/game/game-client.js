export default class GameClient {

    constructor(url) {
        this.id = false;
        this.socket = new WebSocket(url);
    }

    set onMessage(onmessage) {
        this.socket.onmessage = onmessage;
    }

    _send(data) {
        this.socket.send({data});
    }

    left() {
        this._send({
            type: 'move',
            direction: 'left'
        });
    }

    right() {
        this._send({
            type: 'move',
            direction: 'left'
        });
    }

    jump() {
        this._send({
            type: 'jump'
        });
    }

    stop() {
        this._send({
            type: 'stop',
        });
    }

    click(x, y) {
        this._send({
            type: 'click',
            x: x,
            y: y
        });
    }

}