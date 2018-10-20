import "reflect-metadata";
import Particle from "./physics/particle";
import {PHYSICS_INTERVAL} from "../constants";
import {decorate, injectable} from "inversify";
import Vector2 from "./data/vector2";
import RigidBody from "./physics/rigid-body";
import CollisionResolver from "./geometry/collision-resolver";
import Manifold from "./geometry/manifold";
import CollisionDetector from "./geometry/collision-detector";
import Particles from "./data/particles";
export default class World {

    private readonly _particles: Particles;

    public get particles(): Particles {
        return this._particles;
    }

    private _onWorldUpdate: (tick: number) => void;

    public set onWorldUpdate(onPhysicsUpdate: (tick: number) => void) {
        this._onWorldUpdate = onPhysicsUpdate;
    }

    public constructor() {
        this._particles = new Particles();
    }

    public start(): void {
        let tick: number = 0;
        let lastUpdate: number = Date.now();

        setInterval(() => {
            const now: number = Date.now();
            const dt: number = now - lastUpdate;
            lastUpdate = now;

            this.updatePhysics(dt / 1000);

            if (this._onWorldUpdate) {
                this._onWorldUpdate(tick++);
            }
        }, PHYSICS_INTERVAL);
    }

    public updatePhysics(dt: number): void {
        const manifolds: Manifold[] = [];

        for (const particleId in this._particles.map) {
            if (!this._particles.map.hasOwnProperty(particleId)) {
                continue;
            }

            const particle: Particle = this._particles.getObject(particleId);
            if (particle.isStatic || !(particle instanceof RigidBody)) {
                continue;
            }

            particle.step(dt);

            // todo Убрать когди придет время
            if (particle.position.y < 0) {
                particle.position = new Vector2(particle.position.x, 0);
                particle.linearVelocity = new Vector2(particle.linearVelocity.x, 0);
            }

            for (const collideId in this._particles.map) {
                if (!this._particles.map.hasOwnProperty(collideId)) {
                    continue;
                }

                if (particleId === collideId) {
                    continue;
                }

                const collide: Particle = this._particles.getObject(collideId);
                if (!(collide instanceof RigidBody)) {
                    continue;
                }

                const penetration: Vector2 = CollisionDetector.collide(particle.shape, collide.shape);
                if (penetration && (penetration.x || penetration.y)) {
                    manifolds.push(new Manifold(particle, collide, penetration));
                }
            }
        }

        filter:
            for (let i: number = 0; i < manifolds.length; i++) {
                const manifold: Manifold = manifolds[i];
                for (let j: number = i + 1; j < manifolds.length; j++) {
                    const duplicate: Manifold = manifolds[j];
                    if (manifold.a.id === duplicate.b.id && manifold.b.id === duplicate.a.id) {
                        continue filter;
                    }
                }

                CollisionResolver.resolveState(manifold);
                CollisionResolver.resolveImpulse(manifold);
            }
    }

    public addObject(object: Particle): void {
        this._particles.setObject(object);
    }

    public remove(id: string): void {
        this._particles.removeObject(id);
    }
}

decorate(injectable(), World);
