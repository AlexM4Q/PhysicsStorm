import Vector2 from "../../data/vector2";
import Box from "../geometry/shapes/box";
import Updatable from "../base/updatable";
import RigidBody from "../physics/rigid-body";
import {METAL} from "../physics/material/materials";
import {decorate, injectable} from "inversify";
import EntityFactory from "./entity-factory";
import TYPES from "../../inversify.types";

export default class Block extends RigidBody implements Updatable<Block> {

    public constructor(position: Vector2, halfSize: Vector2) {
        super(new Box(position, halfSize), METAL, true);

        this.id = EntityFactory.newGuidTyped(TYPES.Block);
    }

    public static createFrom(block: any): Block {
        return new Block(
            Vector2.parse(block._shape.position),
            Vector2.parse(block._shape._halfSize)
        );
    }

}

decorate(injectable(), Block);
