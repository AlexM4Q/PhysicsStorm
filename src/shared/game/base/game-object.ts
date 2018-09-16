import Guid from "../../utils/guid-utils";
import {injectable} from "inversify";
import Updatable from "./updatable";

/**
 * Игровой объект
 */
@injectable()
export default abstract class GameObject implements Updatable<GameObject> {

    public id: string;

    public color: string = "#000000";

    protected constructor() {
        this.id = Guid.newGuid();
    }

    public abstract draw(canvasContext: CanvasRenderingContext2D): void;

    public updateBy(object: GameObject): void {
        this.color = object.color;
    }

}