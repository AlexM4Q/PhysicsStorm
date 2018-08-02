import {worldHeight} from "../../shared/constants";
import Vector from "../../shared/data/vector";
import ClientContext from "./client-context";
import {inject, injectable} from "inversify";

@injectable()
export default class InputController {

    public constructor(@inject(ClientContext) private readonly context: ClientContext) {
    }

    onKeyDown(event): void {
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

    onKeyUp(event) {
        switch (event.code) {
            case "KeyD":
            case "KeyA":
                this.context.stop();
                break;
        }
    }

    onClick(event) {
        if (event.path[0].id === 'scene') {
            this.context.click(new Vector(event.layerX, worldHeight - event.layerY));
        }
    }

}