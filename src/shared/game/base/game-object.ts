import {decorate, injectable, unmanaged} from "inversify";
import Updatable from "./updatable";

/**
 * Игровой объект
 */
export default abstract class GameObject implements Updatable<GameObject> {

    private readonly _id: string;

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
    }

    public color: string = "#000000";

    protected constructor(id: string) {
        this._id = id;
    }

    public abstract draw(canvasContext: CanvasRenderingContext2D): void;

    public updateBy(gameObject: GameObject): void {
        this.color = gameObject.color;
    }

}

decorate(injectable(), GameObject);
decorate(unmanaged() as any, GameObject, 0);
