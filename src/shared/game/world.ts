import "reflect-metadata";
import Particle from "./physics/particle";
import {physicInterval} from "../constants";
import {injectable} from "inversify";
import GameObject from "./base/game-object";
import Vector2 from "../data/vector2";
import RigidBody from "./physics/rigid-body";
import WorldGenerator from "./world-generator";
import GeometryUtils from "../utils/geometry-utils";
import Manifold from "./physics/collide";

@injectable()
export default class World {

    private _particles: Particle[] = [];

    public get particles(): GameObject[] {
        return this._particles;
    }

    private _onPhysicsUpdate: any;

    public set onPhysicsUpdate(onPhysicsUpdate: any) {
        this._onPhysicsUpdate = onPhysicsUpdate;
    }

    public start(): void {
        new WorldGenerator(this).generate();

        let lastUpdate: number = Date.now();
        setInterval(() => {
            const now = Date.now();
            const dt = now - lastUpdate;
            lastUpdate = now;

            this.updatePhysics(dt / 1000);
        }, physicInterval);
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

                const penetration = GeometryUtils.collide(particle.shape, collide.shape);
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

            const particle: RigidBody = manifold.a;
            const collide: RigidBody = manifold.b;
            const penetration: Vector2 = manifold.penetration;

            // if (collide.isStatic || collide.grounded) {
            //     particle.resolveCollision(penetration, true);
            // } else {
            //     const halfPenetration: Vector2 = penetration.factor(0.5);
            //     const minusHalfPenetration: Vector2 = halfPenetration.factor(-1);
            //     particle.resolveCollision(halfPenetration, true);
            //     collide.resolveCollision(minusHalfPenetration, true);
            // }

            World.resolveCollision(particle, collide, penetration);
        }

        if (this._onPhysicsUpdate) {
            this._onPhysicsUpdate();
        }
    }

    private static resolveCollision(a: RigidBody, b: RigidBody, penetration: Vector2): void {
        const normal: Vector2 = penetration.normalized;
        const length: number = penetration.length;

        let relativeVelocity: Vector2 = b.linearVelocity.subtract(a.linearVelocity);
        let velocityAlongNormal: number = relativeVelocity.dotProduct(normal);
        if (velocityAlongNormal > 0) {
            return;
        }

        const restitution: number = Math.min(a.material.restitution, b.material.restitution);
        const j: number = -(1 + restitution) * velocityAlongNormal / (a.massData.inverse_mass + b.massData.inverse_mass);

        const impulse: Vector2 = normal.factor(j);
        const massSum: number = 1 / (a.massData.mass + b.massData.mass);

        a.applyImpulse(impulse.factor(-a.massData.mass * massSum));
        b.applyImpulse(impulse.factor(b.massData.mass * massSum));

        const percent: number = 1;
        const slop: number = 0.01;
        const correction: Vector2 = normal.factor(Math.max(length - slop, 0) * massSum * percent);
        a.position = a.position.subtract(correction.factor(a.massData.mass));
        b.position = b.position.add(correction.factor(b.massData.mass));

        // if (!normal.x || !normal.y) {
        //     return;
        // }
        //
        // relativeVelocity = b.linearVelocity.subtract(a.linearVelocity);
        // velocityAlongNormal = relativeVelocity.dotProduct(normal);
        // const tangent: Vector2 = new Vector2(
        //     relativeVelocity.x - normal.x * velocityAlongNormal,
        //     relativeVelocity.y - normal.y * velocityAlongNormal
        // ).normalized;
        //
        // const jt: number = -relativeVelocity.dotProduct(tangent) / (a.massData.inverse_mass + b.massData.inverse_mass);
        // const mu: number = Math.sqrt(a.material.staticFriction * a.material.staticFriction + b.material.staticFriction * b.material.staticFriction);
        //
        // const frictionImpulse: Vector2 = Math.abs(jt) < j * mu
        //     ? tangent.factor(jt)
        //     : tangent.factor(-j * Math.sqrt(a.material.dynamicFriction * a.material.dynamicFriction + b.material.dynamicFriction * b.material.dynamicFriction));
        //
        // a.applyImpulse(frictionImpulse.factor(-1));
        // b.applyImpulse(frictionImpulse);
    }
}