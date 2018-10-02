import Vector2 from "../../data/vector2";
import Updatable from "../base/updatable";
import RigidBody from "../physics/rigid-body";
import {RUBBER} from "../physics/material/materials";
import Circle from "../geometry/shapes/circle";
import {decorate, injectable} from "inversify";
import EntityFactory from "./entity-factory";
import TYPES from "../../inversify.types";

export default class Ball extends RigidBody implements Updatable<Ball> {

    public constructor(position: Vector2, radius: number) {
        super(new Circle(position, radius), RUBBER);

        this.id = EntityFactory.newGuidTyped(TYPES.Ball);
        this.color = "#ff0000";
    }

    public static createFrom(ball: any): Ball {
        return new Ball(
            Vector2.parse(ball._shape.position),
            ball._shape._radius
        );
    }

}

decorate(injectable(), Ball);