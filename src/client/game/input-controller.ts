import {decorate, inject, injectable} from "inversify";
import Vector2 from "../../shared/data/vector2";
import ClientContext from "./client-context";
import {CLIENT_TYPES} from "../inversify.types";
import {WORLD_HEIGHT} from "../../shared/constants";

export default class InputController {

    public inputHistory: { [inputNumber: number]: any };
    private _inputNumber: number = 0;

    public constructor(private readonly context: ClientContext) {
    }

    public startGame(): void {
        this.context.startGame();
    }

    public onKeyDown(event: any): void {
        switch (event.code) {
            case "KeyA":
                this.context.left(this._inputNumber);
                // this.inputHistory[this._inputNumber] = undefined;
                this._inputNumber++;
                break;
            case "KeyD":
                this.context.right(this._inputNumber++);
                break;
            case "Space":
                this.context.jump(this._inputNumber++);
                break;
        }
    }

    public onKeyUp(event: any): void {
        switch (event.code) {
            case "KeyD":
            case "KeyA":
                this.context.stop(this._inputNumber++);
                break;
        }
    }

    public onClick(event: any): void {
        if (event.path[0].id === 'scene') {
            this.context.click(this._inputNumber++, new Vector2(event.layerX, WORLD_HEIGHT - event.layerY));
        }
    }

}

decorate(injectable(), InputController);
decorate(inject(CLIENT_TYPES.ClientContext) as any, InputController, 0);
