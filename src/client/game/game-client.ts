import {connect} from "socket.io-client";

export default class GameClient {

    private id: string;
    private readonly _socket: any;

    constructor(url) {
        this._socket = connect(url);
        this._send({
            type: 'register'
        })
    }

    public set onMessage(onmessage) {
        this._socket.on('message', onmessage);
    }

    private _send(data): void {
        data.id = this.id;
        this._socket.send(data);
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