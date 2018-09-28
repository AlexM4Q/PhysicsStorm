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
            particle.handleCollision(correctedPenetration);
            particle.position = particle.position.subtract(correctedPenetration);
            return;
        }

        let particlePenetrationX: number = 0;
        let particlePenetrationY: number = 0;
        let collidePenetrationX: number = 0;
        let collidePenetrationY: number = 0;

        if (penetration.x < -CollisionResolver.PENETRATION_TOLERANCE || CollisionResolver.PENETRATION_TOLERANCE < penetration.x) {
            if (!particle.linearVelocity.x == !collide.linearVelocity.x) {
                const particleXAbsVelocity: number = Math.abs(particle.linearVelocity.x);
                const collideXAbsVelocity: number = Math.abs(collide.linearVelocity.x);
                const velocityXSum: number = particleXAbsVelocity + collideXAbsVelocity;
                particlePenetrationX = penetration.x * particleXAbsVelocity / velocityXSum;
                collidePenetrationX = -penetration.x * collideXAbsVelocity / velocityXSum;
            } else if (particle.linearVelocity.x) {
                particlePenetrationX = penetration.x;
            } else if (collide.linearVelocity.x) {
                collidePenetrationX = -penetration.x;
            }
        }

        if (penetration.y < -CollisionResolver.PENETRATION_TOLERANCE || CollisionResolver.PENETRATION_TOLERANCE < penetration.y) {
            const particleYMovable: boolean = particle.linearVelocity.y && !particle.grounded;
            const collideYMovable: boolean = collide.linearVelocity.y && !collide.grounded;
            if (particleYMovable == collideYMovable) {
                const particleYAbsVelocity: number = Math.abs(particle.linearVelocity.y);
                const collideYAbsVelocity: number = Math.abs(collide.linearVelocity.y);
                const velocityYSum: number = particleYAbsVelocity + collideYAbsVelocity;
                particlePenetrationY = penetration.y * particleYAbsVelocity / velocityYSum;
                collidePenetrationY = -penetration.y * collideYAbsVelocity / velocityYSum;
            } else if (particleYMovable) {
                particlePenetrationY = penetration.y;
            } else if (collideYMovable) {
                collidePenetrationY = -penetration.y;
            }
        }

        particlePenetrationX = this.correctWithPenetrationTolerance(particlePenetrationX);
        particlePenetrationY = this.correctWithPenetrationTolerance(particlePenetrationY);
        collidePenetrationX = this.correctWithPenetrationTolerance(collidePenetrationX);
        collidePenetrationY = this.correctWithPenetrationTolerance(collidePenetrationY);

        const particleCollisionResolve: Vector2 = new Vector2(particlePenetrationX, particlePenetrationY);
        particle.handleCollision(particleCollisionResolve);
        particle.position = particle.position.subtract(particleCollisionResolve);

        const collideCollisionResolve: Vector2 = new Vector2(collidePenetrationX, collidePenetrationY);
        collide.handleCollision(collideCollisionResolve);
        collide.position = collide.position.subtract(collideCollisionResolve);
    }

    private static correctWithPenetrationTolerance(value: number): number {
        return value
            ? value < 0
                ? value + CollisionResolver.PENETRATION_TOLERANCE
                : value - CollisionResolver.PENETRATION_TOLERANCE
            : 0;
    }

    public static resolveImpulse(manifold: Manifold): void {
        const penetration: Vector2 = manifold.penetration;
        if (!(penetration.x || penetration.y)) {
            return;
        }

        const a: RigidBody = manifold.a;
        const b: RigidBody = manifold.b;

        const normal: Vector2 = penetration.normalized;
        const length: number = penetration.length;

        let relativeVelocity: Vector2 = b.linearVelocity.subtract(a.linearVelocity);
        let velocityAlongNormal: number = relativeVelocity.dotProduct(normal);
        if (velocityAlongNormal > 0) {
            return;
        }

        const restitution: number = (a.material.restitution + b.material.restitution) / 2;
        const j: number = -(1 + restitution) * velocityAlongNormal / (a.massData.inverse_mass + b.massData.inverse_mass);

        const impulse: Vector2 = normal.factor(j);
        const massSum: number = 1 / (a.massData.mass + b.massData.mass);

        a.applyImpulse(impulse.factor(-b.massData.mass * massSum));
        b.applyImpulse(impulse.factor(a.massData.mass * massSum));

        const percent: number = 0.1;
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