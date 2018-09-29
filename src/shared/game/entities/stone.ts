import Vector2 from "../../data/vector2";
import Updatable from "../base/updatable";
import RigidBody from "../physics/rigid-body";
import {STONE} from "../physics/material/materials";
import Polygon from "../geometry/shapes/polygon";

export default class Stone extends RigidBody implements Updatable<Stone> {

    public constructor(position: Vector2, vertices: Vector2[]) {
        super(new Polygon(position, vertices), STONE);

        this._rotary = true;
        this.color = "#555555";
    }

}