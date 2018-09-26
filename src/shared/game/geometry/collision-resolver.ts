import Manifold from "./manifold";
import Vector2 from "../../data/vector2";
import RigidBody from "../physics/rigid-body";

export default class CollisionResolver {

    public static readonly PENETRATION_TOLERANCE: number = 10E-3;

    public static resolve(manifold: Manifold): void {
        const particle: RigidBody = manifold.a;
        const collide: RigidBody = manifold.b;
        const penetration: Vector2 = manifold.penetration;

        if (collide.isStatic) {
            particle.handleCollision(penetration);
            particle.position = particle.position.subtract(penetration);
            return;
        }

        let particlePenetrationX: number = 0;
        let particlePenetrationY: number = 0;
        let collidePenetrationX: number = 0;
        let collidePenetrationY: number = 0;

        if (penetration.x < -CollisionResolver.PENETRATION_TOLERANCE || CollisionResolver.PENETRATION_TOLERANCE < penetration.x) {
            if (particle.linearVelocity.x && collide.linearVelocity.x) {
                const particleXAbsVelocity: number = Math.abs(particle.linearVelocity.x);
                const collideXAbsVelocity: number = Math.abs(collide.linearVelocity.x);
                const velocityXSum: number = particleXAbsVelocity + collideXAbsVelocity;
                particlePenetrationX = penetration.x * particleXAbsVelocity / velocityXSum;
                collidePenetrationX = -penetration.x * collideXAbsVelocity / velocityXSum;
            } else if (particle.linearVelocity.x) {
                particlePenetrationX = penetration.x;
            } else {
                collidePenetrationX = -penetration.x;
            }
        }

        if (penetration.y < -CollisionResolver.PENETRATION_TOLERANCE || CollisionResolver.PENETRATION_TOLERANCE < penetration.y) {
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
            } else {
                collidePenetrationY = -penetration.y;
            }
        }

        const particleCollisionResolve: Vector2 = new Vector2(particlePenetrationX, particlePenetrationY);
        particle.handleCollision(particleCollisionResolve);
        particle.position = particle.position.subtract(particleCollisionResolve);

        const collideCollisionResolve: Vector2 = new Vector2(collidePenetrationX, collidePenetrationY);
        collide.handleCollision(collideCollisionResolve);
        collide.position = collide.position.subtract(collideCollisionResolve);
    }

}