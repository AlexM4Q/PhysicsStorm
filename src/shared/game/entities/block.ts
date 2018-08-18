import Vector from "../../data/vector";
import Box from "../shapes/box";
import Updatable from "../base/updatable";
import RigidBody from "../physics/rigid-body";
import {METAL} from "../material/materials";

export default class Block extends RigidBody implements Updatable<Block> {

    public constructor(position: Vector, size: Vector) {
        super(new Box(position, size), METAL, true);
    }

    public draw(canvasContext: CanvasRenderingContext2D): void {
        this._shape.draw(canvasContext);
    }

    public updateBy(block: Block): void {
        super.updateBy(block);
    }

}