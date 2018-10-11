import {decorate, inject, injectable} from "inversify";
import Vector2 from "../../shared/game/data/vector2";
import ClientContext from "./client-context";
import {CLIENT_TYPES} from "../inversify.types";
import {WORLD_HEIGHT} from "../../shared/constants";

// todo Наладить систему управления
export default class InputController {

    private readonly _context: ClientContext;

    public constructor(context: ClientContext) {
        this._context = context;
    }

    public startGame(): void {
        this._context.startGame();
    }

    public onKeyDown(event: any): void {
        switch (event.code) {
            case "KeyA":
                this._context.left();
                break;
            case "KeyD":
                this._context.right();
                break;
            case "Space":
                this._context.jump();
                break;
        }
    }

    public onKeyUp(event: any): void {
        switch (event.code) {
            case "KeyA":
            case "KeyD":
                this._context.stop();
                break;
        }
    }

    public onClick(event: any): void {
        if (event.path[0].id === "scene") {
            this._context.click(new Vector2(event.layerX, WORLD_HEIGHT - event.layerY));
        }
    }

}

decorate(injectable(), InputController);
decorate(inject(CLIENT_TYPES.ClientContext) as any, InputController, 0);
