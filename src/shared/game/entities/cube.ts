import Vector2 from "../../data/vector2";
import RigidBody from "../physics/rigid-body";
import Updatable from "../base/updatable";
import Box from "../geometry/shapes/box";
import Color from "../../utils/color-utils";
import {RUBBER} from "../physics/material/materials";
import {decorate, injectable} from "inversify";
import EntityFactory from "./entity-factory";
import TYPES from "../../inversify.types";

export default class Cube extends RigidBody implements Updatable<Cube> {

    public constructor(position: Vector2, halfSize: Vector2) {
        super(new Box(position, halfSize), RUBBER);

        this.id = EntityFactory.newGuidTyped(TYPES.Cube);
        this.color = Color.newColor();
    }

    public static createFrom(cube: any): Cube {
        return new Cube(
            Vector2.parse(cube._shape.position),
            Vector2.parse(cube._shape._halfSize)
        );
    }

}

decorate(injectable(), Cube);
