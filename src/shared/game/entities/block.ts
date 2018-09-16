import Vector2 from "../../data/vector2";
import Box from "../shapes/box";
import Updatable from "../base/updatable";
import RigidBody from "../physics/rigid-body";
import {METAL} from "../material/materials";

export default class Block extends RigidBody implements Updatable<Block> {

    public constructor(position: Vector2, halfSize: Vector2) {
        super(new Box(position, halfSize), METAL, true);
    }

}