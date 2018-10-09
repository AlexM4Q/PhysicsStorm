import Vector, {default as Vector2} from "../data/vector2";
import RigidBody from "../physics/rigid-body";
import Updatable from "../base/updatable";
import {METAL} from "../physics/material/materials";
import Box from "../geometry/shapes/box";
import EntityFactory from "../entity-factory";
import TYPES from "../../inversify.types";

export default class Player extends RigidBody implements Updatable<Player> {

    private static readonly MAX_VELOCITY: number = 15;

    private static readonly JUMP_STRENGTH: number = 100;

    private static readonly LEFT_IMPULSE: Vector2 = new Vector2(-Player.MAX_VELOCITY, 0);

    private static readonly RIGHT_IMPULSE: Vector2 = new Vector2(Player.MAX_VELOCITY, 0);

    private static readonly JUMP_IMPULSE: Vector2 = new Vector2(0, Player.JUMP_STRENGTH);

    private _direction: number = 0;

    public constructor(id: string, position: Vector2) {
        super(
            id || EntityFactory.newGuidTyped(TYPES.Player),
            new Box(position, new Vector2(1, 1)),
            METAL
        );

        this.color = "#ABCDEF";
    }

    public step(dt: number): void {
        super.step(dt);

        if (this.linearVelocity.x > Player.MAX_VELOCITY) {
            this.linearVelocity = new Vector(Player.MAX_VELOCITY, this.linearVelocity.y);
        } else if (this.linearVelocity.x < -Player.MAX_VELOCITY) {
            this.linearVelocity = new Vector(-Player.MAX_VELOCITY, this.linearVelocity.y);
        }

        switch (this._direction) {
            case 1:
                this.applyImpulse(Player.RIGHT_IMPULSE);
                break;
            case 0:
                if (this.linearVelocity.x) {
                    this.linearVelocity = new Vector(0, this.linearVelocity.y);
                }
                break;
            case -1:
                this.applyImpulse(Player.LEFT_IMPULSE);
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
        this.applyImpulse(Player.JUMP_IMPULSE);
    }

    public shoot(target: Vector2): void {
        //
    }

    public updateBy(player: Player) {
        super.updateBy(player);

        if (this._direction !== undefined) {
            this._direction = player._direction;
        }
    }

    public static createNew(id: string, position: Vector2 = Vector2.ZERO): Player {
        return new Player(id, position);
    }

    public static createFrom(player: any): Player {
        return new Player(
            player._id,
            Vector2.parse(player._shape.position)
        );
    }

}