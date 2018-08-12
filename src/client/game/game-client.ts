import {connect} from "socket.io-client";
import ConsoleLogger from "../../shared/logging/console-logger";
import Logger from "../../shared/logging/logger";
import Vector from "../../shared/data/vector";

export default class GameClient {

    private static readonly log: Logger = new ConsoleLogger("GameClient");

    private _id: string;
    private _socket: any;

    private _onRegister: any;

    constructor(url: string) {
        this.connect(url);
    }

    public connect(url: string): void {
        if (this._socket) {
            this._socket.destroy();
            delete this._socket;
            this._socket = undefined;
        }

        this._socket = connect(url, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity
        });

        this._socket.on('connect', () => {
            GameClient.log.debug("Connected to server");

            this._socket.emit('register-request', this._id);
        });

        this._socket.on('register-response', (id) => {
            GameClient.log.debug(`Registered as ${id}`);

            this._id = id;
            this._onRegister(id);
        });

        this._socket.on('disconnect', () => {
            setTimeout(() => this.connect(url), 5000);
        });
    }

    public set onMessage(onmessage) {
        this._socket.on('message', onmessage);
    }

    public set onRegister(onRegister) {
        this._onRegister = onRegister;
    }

    private _sendInput(data: any, inputNumber: number): void {
        data.id = this._id;
        data.time = Date.now();
        data.inputNumber = inputNumber;
        this._socket.send(data);
    }

    public right(inputNumber: number): void {
        this._sendInput({
            type: 'step',
            direction: 'right'
        }, inputNumber);
    }

    public left(inputNumber: number): void {
        this._sendInput({
            type: 'step',
            direction: 'left'
        }, inputNumber);
    }

    public stop(inputNumber: number): void {
        this._sendInput({
            type: 'step',
            direction: 'stop'
        }, inputNumber);
    }

    public jump(inputNumber: number): void {
        this._sendInput({
            type: 'step',
            direction: 'jump'
        }, inputNumber);
    }

    public click(inputNumber: number, target: Vector): void {
        this._sendInput({
            type: 'click',
            target: target
        }, inputNumber);
    }

}