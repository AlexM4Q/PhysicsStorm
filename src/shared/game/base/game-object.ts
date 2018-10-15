import Importable from "./importable";
import Exportable from "./exportable";
import Viewport from "../data/viewport";

/**
 * Игровой объект
 */
export default abstract class GameObject implements Importable<GameObject>, Exportable<GameObject> {

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

    public export(gameObject: GameObject): any {
        return {
            _id: this._id,
            color: this.color
        };
    }

}