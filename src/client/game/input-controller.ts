import {decorate, inject, injectable} from "inversify";
import Vector2 from "../../shared/game/data/vector2";
import ClientContext from "./client-context";
import {CLIENT_TYPES} from "../inversify.types";

export default class InputController {

    private readonly _context: ClientContext;

    private pressingLeft: boolean;

    private pressingRight: boolean;

    public constructor(context: ClientContext) {
        this._context = context;
    }

    public startGame(): void {
        this._context.startGame();
    }

    public onKeyDown(event: any): void {
        switch (event.code) {
            case "KeyA":
                this.left(true);
                break;
            case "KeyD":
                this.right(true);
                break;
            case "Space":
                this.jump();
                break;
        }
    }

    public onKeyUp(event: any): void {
        switch (event.code) {
            case "KeyA":
                this.left(false);
                break;
            case "KeyD":
                this.right(false);
                break;
        }
    }

    public onClick(event: any): void {
        const sceneHeight: number = event.target.height;
        switch (event.type) {
            case "click":
                this._context.click(new Vector2(event.clientX, sceneHeight - event.clientY));
                break;
            case "touchstart":
                this._context.click(new Vector2(event.touches[0].clientX, sceneHeight - event.touches[0].clientY));
                break;
        }
    }

    public left(pressing: boolean): void {
        this.pressingLeft = pressing;
        this.processMovement();
    }

    public right(pressing: boolean): void {
        this.pressingRight = pressing;
        this.processMovement();
    }

    private processMovement(): void {
        if (this.pressingLeft === this.pressingRight) {
            this._context.stop();
        } else if (this.pressingLeft) {
            this._context.left();
        } else if (this.pressingRight) {
            this._context.right();
        }
    }

    public jump(): void {
        this._context.jump();
    }

}

decorate(injectable(), InputController);
decorate(inject(CLIENT_TYPES.ClientContext) as any, InputController, 0);
