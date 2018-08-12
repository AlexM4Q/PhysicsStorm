import {injectable} from "inversify";
import container from "../../inversify.config";
import TYPES from "../../inversify.types";
import Vector from "../../data/vector";
import Bullet from "./bullet";
import RigidBody from "./physics/rigid-body";
import Box from "./shapes/box";
import World from "../world";
import Updatable from "./base/updatable";
import {METAL} from "./material/materials";

@injectable()
export default class Player extends RigidBody implements Updatable<Player> {

    private _direction: number;
    public maxVelocity: Vector;

    public constructor() {
        super(new Box(new Vector(5, 5)), METAL);
        this.position = new Vector();
        this.linearVelocity = new Vector();
        this.maxVelocity = new Vector(0.5, 0.5);
    }

    public step(dt: number): void {
        super.step(dt);

        if (this.linearVelocity.x !== 0) {
            this.linearVelocity = new Vector(this.linearVelocity.x * 0.8, this.linearVelocity.y);
        }

        switch (this._direction) {
            case 1:
                this.addForce(new Vector(this.maxVelocity.x, 0));
                break;
            case -1:
                this.addForce(new Vector(-this.maxVelocity.x, 0));
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
        this.addForce(new Vector(0, 2));
    }

    public shoot(target): void {
        container.get<World>(TYPES.World).addObject(new Bullet(this.position, target));
    }

    public draw(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.fillStyle = this.color;
        this._shape.draw(canvasContext, this.position);
    }

    public updateBy(player: Player) {
        super.updateBy(player);
        this.maxVelocity = Vector.parse(player.maxVelocity);
    }

}