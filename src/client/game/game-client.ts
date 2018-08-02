export default class GameClient {

    private readonly _socket: WebSocket;

    constructor(url) {
        this._socket = new WebSocket(url);
    }

    public set onMessage(onmessage) {
        this._socket.onmessage = onmessage;
    }

    private _send(data): void {
        this._socket.send(JSON.stringify(data));
    }

    public right(): void {
        this._send({
            type: 'move',
            direction: 'right'
        });
    }

    public left(): void {
        this._send({
            type: 'move',
            direction: 'left'
        });
    }

    public stop(): void {
        this._send({
            type: 'move',
            direction: 'stop'
        });
    }

    public jump(): void {
        this._send({
            type: 'move',
            direction: 'jump'
        });
    }

    public click(target): void {
        this._send({
            type: 'click',
            target: target
        });
    }

}