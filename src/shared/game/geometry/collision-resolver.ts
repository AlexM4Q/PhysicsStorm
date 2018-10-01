import Manifold from "./manifold";
import Vector2 from "../../data/vector2";
import RigidBody from "../physics/rigid-body";

export default class CollisionResolver {

    private static readonly PENETRATION_TOLERANCE: number = 10E-9;

    public static resolveState(manifold: Manifold): void {
        const particle: RigidBody = manifold.a;
        const collide: RigidBody = manifold.b;
        const penetration: Vector2 = manifold.penetration;

        if (collide.isStatic) {
            const correctedPenetration: Vector2 = penetration.change(this.correctWithPenetrationTolerance);
            particle.handleCollision(penetration);
            particle.position = particle.position.subtract(correctedPenetration);
            return;
        }

        let particlePenetrationX: number = 0;
        let collidePenetrationX: number = 0;

        if (particle.linearVelocity.x && collide.linearVelocity.x) {
            const particleXAbsVelocity: number = Math.abs(particle.linearVelocity.x);
            const collideXAbsVelocity: number = Math.abs(collide.linearVelocity.x);
            const velocityXSum: number = particleXAbsVelocity + collideXAbsVelocity;
            particlePenetrationX = penetration.x * particleXAbsVelocity / velocityXSum;
            collidePenetrationX = -penetration.x * collideXAbsVelocity / velocityXSum;
        } else if (particle.linearVelocity.x) {
            particlePenetrationX = penetration.x;
        } else if (collide.linearVelocity.x) {
            collidePenetrationX = -penetration.x;
        } else {
            particlePenetrationX = penetration.x / 2;
            collidePenetrationX = -penetration.x / 2;
        }

        let particlePenetrationY: number = 0;
        let collidePenetrationY: number = 0;

        const particleYMovable: boolean = particle.linearVelocity.y && !particle.grounded;
        const collideYMovable: boolean = collide.linearVelocity.y && !collide.grounded;
        if (particleYMovable && collideYMovable) {
            const particleYAbsVelocity: number = Math.abs(particle.linearVelocity.y);
            const collideYAbsVelocity: number = Math.abs(collide.linearVelocity.y);
            const velocityYSum: number = particleYAbsVelocity + collideYAbsVelocity;
            particlePenetrationY = penetration.y * particleYAbsVelocity / velocityYSum;
            collidePenetrationY = -penetration.y * collideYAbsVelocity / velocityYSum;
        } else if (particleYMovable) {
            particlePenetrationY = penetration.y;
        } else if (collideYMovable) {
            collidePenetrationY = -penetration.y;
        } else {
            particlePenetrationY = penetration.y / 2;
            collidePenetrationY = -penetration.y / 2;
        }

        if (particlePenetrationX || particlePenetrationY) {
            particle.handleCollision(new Vector2(particlePenetrationX, particlePenetrationY));
            particlePenetrationX = this.correctWithPenetrationTolerance(particlePenetrationX);
            particlePenetrationY = this.correctWithPenetrationTolerance(particlePenetrationY);
            particle.position = new Vector2(
                particle.position.x - particlePenetrationX,
                particle.position.y - particlePenetrationY
            );
        }

        if (collidePenetrationX || collidePenetrationY) {
            collide.handleCollision(new Vector2(collidePenetrationX, collidePenetrationY));
            collidePenetrationX = this.correctWithPenetrationTolerance(collidePenetrationX);
            collidePenetrationY = this.correctWithPenetrationTolerance(collidePenetrationY);
            collide.position = new Vector2(
                collide.position.x - collidePenetrationX,
                collide.position.y - collidePenetrationY
            );
        }
    }

    private static correctWithPenetrationTolerance(value: number): number {
        return value
            ? value < 0
                ? value + CollisionResolver.PENETRATION_TOLERANCE
                : value - CollisionResolver.PENETRATION_TOLERANCE
            : 0;
    }

    public static resolveImpulse(manifold: Manifold): void {
        const a: RigidBody = manifold.a;
        const b: RigidBody = manifold.b;
        const penetration: Vector2 = manifold.penetration;
        const normal: Vector2 = penetration.normalized;

        // const aAngular: Vector2 = a.position.subtract(a.shape.support(normal)).cross(a.angularVelocity);
        // const bAngular: Vector2 = b.position.subtract(b.shape.support(normal)).cross(b.angularVelocity);
        let relativeVelocity: Vector2 = new Vector2(
            b.linearVelocity.x - a.linearVelocity.x /*+ bAngular.x - aAngular.x*/,
            b.linearVelocity.y - a.linearVelocity.y /*+ bAngular.y - aAngular.y*/
        );

        let velocityAlongNormal: number = relativeVelocity.dotProduct(normal);
        if (velocityAlongNormal >= 0) {
            return;
        }

        const restitution: number = Math.min(a.material.restitution + b.material.restitution);
        const j: number = -(1 + restitution) * velocityAlongNormal / (a.massData.inverse_mass + b.massData.inverse_mass);

        const impulse: Vector2 = normal.factor(j);
        const massSum: number = 1 / (a.massData.mass + b.massData.mass);

        if (b.isStatic) {
            a.applyImpulse(impulse.factor(-a.massData.mass * massSum));
        } else {
            a.applyImpulse(impulse.factor(-b.massData.mass * massSum));
            b.applyImpulse(impulse.factor(a.massData.mass * massSum));
        }

        // const length: number = penetration.length;
        // const percent: number = 0.5;
        // const slop: number = 0.01;
        // const correction: Vector2 = normal.factor(Math.max(length - slop, 0) * massSum * percent);
        // a.position = a.position.subtract(correction.factor(a.massData.mass));
        // b.position = b.position.add(correction.factor(b.massData.mass));

        // if (!normal.x || !normal.y) {
        //     return;
        // }

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