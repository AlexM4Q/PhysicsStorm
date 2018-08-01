import Vector from "../../../data/vector";
import Guid from "../../../utils/guid-utils";

export default abstract class GameObject {

    public id: string = Guid.newGuid();
    protected position: Vector;
    protected color: string = "#000000";

    public abstract draw(context): void;

}