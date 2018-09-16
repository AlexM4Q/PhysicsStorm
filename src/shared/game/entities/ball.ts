import Vector2 from "../../data/vector2";
import Updatable from "../base/updatable";
import RigidBody from "../physics/rigid-body";
import {METAL} from "../material/materials";
import Circle from "../shapes/circle";

export default class Ball extends RigidBody implements Updatable<Ball> {

    public constructor(position: Vector2, radius: number) {
        super(new Circle(position, radius), METAL);

        this.color = "#ff1c19";
    }

}