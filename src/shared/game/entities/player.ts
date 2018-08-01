import Vector from "../../data/vector";
import Bullet from "./bullet";
import RigidBody from "./physics/rigid-body";
import Box from "./shapes/box";
import World from "../world";
import {inject, injectable} from "inversify";
import {TYPES} from "../../inversify.config";

@injectable()
export default class Player extends RigidBody<Box> {

    private _maxVelocity: Vector;

    public constructor(@inject(TYPES.WORLD) private world: World) {
        super();
        this._maxVelocity = new Vector(0.5, 0.5);
    }

    public shoot(target): void {
        this.world.addObject(new Bullet(this.position, target));
    }

    public draw(context): void {
        const size = this.shape.size;

        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, size.x, size.y);
    }

}