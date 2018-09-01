import Vector2 from "../../data/vector2";
import Box from "../shapes/box";
import Updatable from "../base/updatable";
import RigidBody from "../physics/rigid-body";
import {METAL} from "../material/materials";
import Circle from "../shapes/circle";

export default class Block extends RigidBody implements Updatable<Block> {

    public constructor(position: Vector2, halfSize: Vector2) {
        // super(new Circle(position, halfSize.x), METAL, true);
        super(new Box(position, halfSize), METAL, true);
    }

    public draw(canvasContext: CanvasRenderingContext2D): void {
        this._shape.draw(canvasContext);
    }

    public updateBy(block: Block): void {
        super.updateBy(block);
    }

}