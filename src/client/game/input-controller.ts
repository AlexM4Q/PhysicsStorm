import {worldHeight} from "../../shared/constants";
import Vector2 from "../../shared/data/vector2";
import ClientContext from "./client-context";
import {inject, injectable} from "inversify";
import {CLIENT_TYPES} from "../inversify.types";

@injectable()
export default class InputController {

    public inputHistory: { [inputNumber: number]: any };
    private _inputNumber: number = 0;

    public constructor(@inject(CLIENT_TYPES.ClientContext) private readonly context: ClientContext) {
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
            this.context.click(this._inputNumber++, new Vector2(event.layerX, worldHeight - event.layerY));
        }
    }
}