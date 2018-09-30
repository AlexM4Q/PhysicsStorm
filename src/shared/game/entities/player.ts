import {injectable} from "inversify";
import container from "../../inversify.config";
import TYPES from "../../inversify.types";
import Vector, {default as Vector2} from "../../data/vector2";
import RigidBody from "../physics/rigid-body";
import World from "../world";
import Updatable from "../base/updatable";
import {METAL} from "../physics/material/materials";
import Box from "../geometry/shapes/box";
import WorldGenerator from "../world-generator";
import Stone from "./stone";

@injectable()
export default class Player extends RigidBody implements Updatable<Player> {

    public readonly maxVelocity: number = 15;

    public readonly jumpStrength: number = 100;

    private _direction: number = 0;

    public constructor() {
        super(new Box(new Vector(), new Vector2(1, 1)), METAL);

        this.color = "#ABCDEF";
    }

    public step(dt: number): void {
        super.step(dt);

        if (this.linearVelocity.x > this.maxVelocity) {
            this.linearVelocity = new Vector(this.maxVelocity, this.linearVelocity.y);
        } else if (this.linearVelocity.x < -this.maxVelocity) {
            this.linearVelocity = new Vector(-this.maxVelocity, this.linearVelocity.y);
        }

        switch (this._direction) {
            case 1:
                this.applyImpulse(new Vector(this.maxVelocity, 0));
                break;
            case 0:
                if (this.linearVelocity.x) {
                    this.linearVelocity = new Vector(0, this.linearVelocity.y);
                }
                break;
            case -1:
                this.applyImpulse(new Vector(-this.maxVelocity, 0));
                break;
        }
    }

    public right(): void {
        this._direction = 1;
    }

    public left(): void {
        this._direction = -1;
    }

    public stop(): void {
        this._direction = 0;
    }

    public jump(): void {
        this.applyImpulse(new Vector(0, this.jumpStrength));
    }

    public shoot(target: Vector2): void {
        const stone: Stone = WorldGenerator.createRandomStone(target.x, target.y);
        stone.shape.rotate(Math.PI / 8);
        container.get<World>(TYPES.World).addObject(stone);
        // container.get<World>(TYPES.World).addObject(new Bullet(this._shape.position, target));
        // this._world.addObject(WorldGenerator.createBall(target.x, target.y, Math.random() * 25 + 5));
    }

    public updateBy(player: Player) {
        super.updateBy(player);

        this._direction = player._direction;
    }

}