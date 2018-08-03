import {worldHeight} from "../../shared/constants";
import Vector from "../../shared/data/vector";
import ClientContext from "./client-context";
import {inject, injectable} from "inversify";
import {CLIENT_TYPES} from "../inversify.types";

@injectable()
export default class InputController {

    public constructor(@inject(CLIENT_TYPES.ClientContext) private readonly context: ClientContext) {
    }

    public startGame(): void {
        this.context.startGame();
    }

    public onKeyDown(event): void {
        switch (event.code) {
            case "KeyA":
                this.context.left();
                break;
            case "KeyD":
                this.context.right();
                break;
            case "Space":
                this.context.jump();
                break;
        }
    }

    public onKeyUp(event): void {
        switch (event.code) {
            case "KeyD":
            case "KeyA":
                this.context.stop();
                break;
        }
    }

    public onClick(event): void {
        if (event.path[0].id === 'scene') {
            this.context.click(new Vector(event.layerX, worldHeight - event.layerY));
        }
    }
}