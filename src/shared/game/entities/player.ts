import {injectable} from "inversify";
import container from "../../inversify.config";
import TYPES from "../../inversify.types";
import Vector, {default as Vector2} from "../../data/vector2";
import Bullet from "./bullet";
import RigidBody from "../physics/rigid-body";
import World from "../world";
import Updatable from "../base/updatable";
import {METAL} from "../material/materials";
import Box from "../shapes/box";

@injectable()
export default class Player extends RigidBody implements Updatable<Player> {

    public maxVelocity: number = 50;

    public jumpStrangth: number = 10;

    private _direction: number;

    public constructor() {
        super(new Box(new Vector(), new Vector2(25, 25)), METAL);
        this.linearVelocity = new Vector();
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
                this.addForce(new Vector(this.maxVelocity, 0));
                break;
            case 0:
                if (this.linearVelocity.x !== 0) {
                    this.linearVelocity = new Vector(this.linearVelocity.x * 0.8, this.linearVelocity.y);
                }
                break;
            case -1:
                this.addForce(new Vector(-this.maxVelocity, 0));
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
        this.addForce(new Vector(0, this.jumpStrangth));
    }

    public shoot(target: Vector2): void {
        container.get<World>(TYPES.World).addObject(new Bullet(this._shape.position, target));
    }

    public draw(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.fillStyle = this.color;
        this._shape.draw(canvasContext);
    }

    public updateBy(player: Player) {
        super.updateBy(player);
        this.maxVelocity = player.maxVelocity;
        this.jumpStrangth = player.jumpStrangth;
    }

}