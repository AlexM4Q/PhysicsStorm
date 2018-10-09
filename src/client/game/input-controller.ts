import {decorate, inject, injectable} from "inversify";
import Vector2 from "../../shared/game/data/vector2";
import ClientContext from "./client-context";
import {CLIENT_TYPES} from "../inversify.types";
import {WORLD_HEIGHT} from "../../shared/constants";

export default class InputController {

    public constructor(private readonly context: ClientContext) {
    }

    public startGame(): void {
        this.context.startGame();
    }

    public onKeyDown(event: any): void {
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

    public onKeyUp(event: any): void {
        switch (event.code) {
            case "KeyA":
            case "KeyD":
                this.context.stop();
                break;
        }
    }

    public onClick(event: any): void {
        if (event.path[0].id === 'scene') {
            this.context.click(new Vector2(event.layerX, WORLD_HEIGHT - event.layerY));
        }
    }

}

decorate(injectable(), InputController);
decorate(inject(CLIENT_TYPES.ClientContext) as any, InputController, 0);
