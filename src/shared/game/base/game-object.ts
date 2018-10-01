import {injectable} from "inversify";
import Updatable from "./updatable";

/**
 * Игровой объект
 */
@injectable()
export default abstract class GameObject implements Updatable<GameObject> {

    public id: string;

    public color: string = "#000000";

    public abstract draw(canvasContext: CanvasRenderingContext2D): void;

    public updateBy(gameObject: GameObject): void {
        this.color = gameObject.color;
    }

}