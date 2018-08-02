import Vector from "../../../data/vector";
import Guid from "../../../utils/guid-utils";
import {injectable} from "inversify";

@injectable()
export default abstract class GameObject {

    public id: string;
    public position: Vector;
    public color: string = "#000000";

    protected constructor() {
        this.id = Guid.newGuid();
    }

    public abstract draw(context): void;

    public updateBy(object: GameObject) {
        this.position = object.position;
        this.color = object.color;
    }
}