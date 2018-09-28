import Vector2 from "../../data/vector2";
import Updatable from "../base/updatable";
import RigidBody from "../physics/rigid-body";
import {RUBBER} from "../physics/material/materials";
import Circle from "../geometry/shapes/circle";

export default class Ball extends RigidBody implements Updatable<Ball> {

    public constructor(position: Vector2, radius: number) {
        super(new Circle(position, radius), RUBBER);

        this.color = "#ff0000";
    }

}