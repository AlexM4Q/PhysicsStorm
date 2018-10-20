import Vector2 from "../data/vector2";
import RigidBody from "../physics/rigid-body";
import Box from "../geometry/shapes/box";
import Color from "../../utils/color-utils";
import {RUBBER} from "../physics/material/materials";
import EntityFactory from "../entity-factory";
import TYPES from "../../inversify.types";
import Transferable from "../base/transferable";

export default class Cube extends RigidBody implements Transferable<Cube> {

    public constructor(id: string, position: Vector2, halfSize: Vector2) {
        super(
            id || EntityFactory.newGuidTyped(TYPES.Cube),
            new Box(position, halfSize),
            RUBBER
        );

        this.color = Color.newColor();
    }

    public static createNew(position: Vector2, halfSize: Vector2): Cube {
        return new Cube(undefined, position, halfSize);
    }

    public static createFrom(cube: any): Cube {
        return new Cube(
            cube._id,
            Vector2.parse(cube._shape.position),
            Vector2.parse(cube._shape._halfSize)
        );
    }

}