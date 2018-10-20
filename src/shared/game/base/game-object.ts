import Viewport from "../data/viewport";
import Transferable from "./transferable";

/**
 * Игровой объект
 */
export default abstract class GameObject implements Transferable<GameObject> {

    private readonly _id: string;

    public get id(): string {
        return this._id;
    }

    public color: string = "#000";

    protected constructor(id: string) {
        this._id = id;
    }

    public abstract draw(canvasContext: CanvasRenderingContext2D, viewport: Viewport): void;

    public import(gameObject: GameObject): void {
        this.color = gameObject.color;
    }

    public compare(gameObject: GameObject): boolean {
        return this._id === gameObject._id && this.color === gameObject.color;
    }

    public export(gameObject: GameObject): any {
        return {
            _id: this._id,
            color: this.color
        };
    }

}