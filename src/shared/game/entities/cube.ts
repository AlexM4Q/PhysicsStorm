import Vector2 from "../../data/vector2";
import RigidBody from "../physics/rigid-body";
import Updatable from "../base/updatable";
import Box from "../geometry/shapes/box";
import Color from "../../utils/color-utils";
import {RUBBER} from "../physics/material/materials";

export default class Cube extends RigidBody implements Updatable<Cube> {

    public constructor(position: Vector2, halfSize: Vector2) {
        super(new Box(position, halfSize), RUBBER);

        this.color = Color.newColor();
    }

}