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
                this.left();
                break;
            case "KeyD":
                this.right();
                break;
            case "Space":
                this.jump();
                break;
        }
    }

    public onKeyUp(event: any): void {
        switch (event.code) {
            case "KeyA":
            case "KeyD":
                this.stop();
                break;
        }
    }

    public onClick(event: any): void {
        switch (event.type) {
            case "click":
                this._context.click(new Vector2(event.clientX, WORLD_HEIGHT - event.clientY));
                break;
            case "touchstart":
                this._context.click(new Vector2(event.touches[0].clientX, WORLD_HEIGHT - event.touches[0].clientY));
                break;
        }
    }

    public left(): void {
        this._context.left();
    }

    public right(): void {
        this._context.right();
    }

    public jump(): void {
        this._context.jump();
    }

    public stop(): void {
        this._context.stop();
    }

}

decorate(injectable(), InputController);
decorate(inject(CLIENT_TYPES.ClientContext) as any, InputController, 0);
