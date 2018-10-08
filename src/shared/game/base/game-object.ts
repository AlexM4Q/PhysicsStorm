import Updatable from "./updatable";

/**
 * Игровой объект
 */
export default abstract class GameObject implements Updatable<GameObject> {

    private readonly _id: string;

    public get id(): string {
        return this._id;
    }

    public color: string = "#000";

    protected constructor(id: string) {
        this._id = id;
    }

    public abstract draw(canvasContext: CanvasRenderingContext2D): void;

    public updateBy(gameObject: GameObject): void {
        this.color = gameObject.color;
    }

}