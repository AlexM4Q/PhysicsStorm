import Vector2 from "../data/vector2";
import Box from "../geometry/shapes/box";
import RigidBody from "../physics/rigid-body";
import {METAL} from "../physics/material/materials";
import EntityFactory from "../entity-factory";
import TYPES from "../../inversify.types";
import Transferable from "../base/transferable";

export default class Bullet extends RigidBody implements Transferable<Bullet> {

    private direction: Vector2;

    public constructor(id: string, position: Vector2, target: Vector2) {
        super(
            id || EntityFactory.newGuidTyped(TYPES.Bullet),
            new Box(position, new Vector2(2, 2)),
            METAL
        );

        this.color = "#f00";
        this.linearVelocity = Vector2.ZERO;
        this.direction = target.subtract(position).normalized;
    }

    public step(dt: number): void {
        this.position = this.position.add(this.linearVelocity.multiply(this.direction).factor(dt));
    }

    public import(bullet: Bullet): void {
        super.import(bullet);

        if (this.direction !== undefined) {
            this.direction = Vector2.parse(bullet.direction);
        }
    }

}