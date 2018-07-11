export default class GameClient {

    constructor(url) {
        this._socket = new WebSocket(url);
    }

    set onMessage(onmessage) {
        this._socket.onmessage = onmessage;
    }

    _send(data) {
        this._socket.send(JSON.stringify(data));
    }

    right() {
        this._send({
            type: 'move',
            direction: 'right'
        });
    }

    left() {
        this._send({
            type: 'move',
            direction: 'left'
        });
    }

    stop() {
        this._send({
            type: 'move',
            direction: 'stop'
        });
    }

    jump() {
        this._send({
            type: 'move',
            direction: 'jump'
        });
    }

    click(target) {
        this._send({
            type: 'click',
            target: target
        });
    }

}