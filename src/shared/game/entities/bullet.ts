import Vector2 from "../../data/vector2";
import Box from "../geometry/shapes/box";
import Updatable from "../base/updatable";
import RigidBody from "../physics/rigid-body";
import {METAL} from "../physics/material/materials";
import {decorate, injectable} from "inversify";
import EntityFactory from "./entity-factory";
import TYPES from "../../inversify.types";

export default class Bullet extends RigidBody implements Updatable<Bullet> {

    private direction: Vector2;

    public constructor(position: Vector2, target: Vector2) {
        super(new Box(position, new Vector2(2, 2)), METAL);

        this.id = EntityFactory.newGuidTyped(TYPES.Bullet);
        this.color = "#ff0000";
        this.linearVelocity = Vector2.ZERO;
        this.direction = target.subtract(position).normalized;
    }

    public step(dt: number): void {
        this.position = this.position.add(this.linearVelocity.multiply(this.direction).factor(dt));
    }

    public updateBy(bullet: Bullet): void {
        super.updateBy(bullet);

        if (this.direction !== undefined) {
            this.direction = Vector2.parse(bullet.direction);
        }
    }

}

decorate(injectable(), Bullet);
