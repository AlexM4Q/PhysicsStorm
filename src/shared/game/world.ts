import "reflect-metadata";
import Particle from "./physics/particle";
import {PHYSICS_INTERVAL} from "../constants";
import {injectable} from "inversify";
import GameObject from "./base/game-object";
import Vector2 from "../data/vector2";
import RigidBody from "./physics/rigid-body";
import WorldGenerator from "./world-generator";
import CollisionResolver from "./geometry/collision-resolver";
import Manifold from "./geometry/manifold";
import CollisionDetector from "./geometry/collision-detector";

@injectable()
export default class World {

    private _particles: Particle[] = [];

    public get particles(): GameObject[] {
        return this._particles;
    }

    private _onWorldUpdate: any;

    public set onWorldUpdate(onPhysicsUpdate: any) {
        this._onWorldUpdate = onPhysicsUpdate;
    }

    public start(): void {
        new WorldGenerator(this).generate();

        let lastUpdate: number = Date.now();
        setInterval(() => {
            const now = Date.now();
            const dt = now - lastUpdate;
            lastUpdate = now;

            this.updatePhysics(dt / 1000);
        }, PHYSICS_INTERVAL);
    }

    public update(state: Particle[]): void {
        for (let object of state) {
            for (let gameObject of this._particles) {
                if (object.id === gameObject.id) {
                    gameObject.updateBy(object);
                    break;
                }
            }
        }

        if (this._onWorldUpdate) {
            this._onWorldUpdate();
        }
    }

    public addObject(object: Particle): void {
        this._particles.push(object);
    }

    public remove(id: string): void {
        this._particles = this._particles.filter(x => x.id !== id);
    }

    public updatePhysics(dt: number): void {
        const manifolds: Manifold[] = [];

        for (let particle of this._particles) {
            if (particle.isStatic) {
                continue;
            }

            particle.step(dt);

            if (particle.position.y < 0) {
                particle.position = new Vector2(particle.position.x, 0);
                if (particle instanceof RigidBody) {
                    const rigidBody = particle as RigidBody;
                    rigidBody.linearVelocity = new Vector2(rigidBody.linearVelocity.x, 0);
                }
            }

            for (let collide of this._particles) {
                if (particle.id === collide.id) continue;

                const penetration = CollisionDetector.collide(particle.shape, collide.shape);
                if (penetration && (penetration.x || penetration.x == 0) && (penetration.y || penetration.y == 0)) {

                    if (particle instanceof RigidBody && collide instanceof RigidBody) {
                        manifolds.push(new Manifold(particle, collide, penetration));
                    }
                }
            }
        }

        filter:for (let i = 0; i < manifolds.length; i++) {
            const manifold: Manifold = manifolds[i];
            for (let j = i + 1; j < manifolds.length; j++) {
                const duplicate: Manifold = manifolds[j];
                if (manifold.a.id == duplicate.b.id && manifold.b.id == duplicate.a.id) {
                    continue filter;
                }
            }

            CollisionResolver.resolveState(manifold);
            CollisionResolver.resolveImpulse(manifold);
        }

        if (this._onWorldUpdate) {
            this._onWorldUpdate();
        }
    }
}