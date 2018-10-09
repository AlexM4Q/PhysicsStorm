import Vector2 from "../data/vector2";
import Box from "../geometry/shapes/box";
import Updatable from "../base/updatable";
import RigidBody from "../physics/rigid-body";
import {METAL} from "../physics/material/materials";
import EntityFactory from "./entity-factory";
import TYPES from "../../inversify.types";

export default class Block extends RigidBody implements Updatable<Block> {

    public constructor(id: string, position: Vector2, halfSize: Vector2) {
        super(
            id || EntityFactory.newGuidTyped(TYPES.Block),
            new Box(position, halfSize),
            METAL,
            true
        );
    }

    public static createNew(position: Vector2, halfSize: Vector2): Block {
        return new Block(undefined, position, halfSize);
    }

    public static createFrom(block: any): Block {
        return new Block(
            block._id,
            Vector2.parse(block._shape.position),
            Vector2.parse(block._shape._halfSize)
        );
    }

}