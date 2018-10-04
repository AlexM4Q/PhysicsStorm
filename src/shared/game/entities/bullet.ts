import Vector2 from "../../data/vector2";
import Box from "../geometry/shapes/box";
import Updatable from "../base/updatable";
import RigidBody from "../physics/rigid-body";
import {METAL} from "../physics/material/materials";
import {decorate, injectable, unmanaged} from "inversify";
import EntityFactory from "./entity-factory";
import TYPES from "../../inversify.types";

export default class Bullet extends RigidBody implements Updatable<Bullet> {

    private direction: Vector2;

    protected constructor(id: string, position: Vector2, target: Vector2) {
        super(
            id || EntityFactory.newGuidTyped(TYPES.Bullet),
            new Box(position, new Vector2(2, 2)),
            METAL
        );

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
decorate(unmanaged() as any, Bullet, 0);
decorate(unmanaged() as any, Bullet, 1);
