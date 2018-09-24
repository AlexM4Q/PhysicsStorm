import Manifold from "./manifold";
import Vector2 from "../../data/vector2";
import RigidBody from "../physics/rigid-body";

export default class CollisionResolver {

    public static resolve(manifold: Manifold): void {
        const particle: RigidBody = manifold.a;
        const collide: RigidBody = manifold.b;
        const penetration: Vector2 = manifold.penetration;

        this.position = this.position.subtract(penetration);

        if (collide.isStatic) {
            particle.handleCollision(penetration);
            return;
        }

        if (collide.linearVelocity.y) {

        }

        const halfPenetration: Vector2 = penetration.factor(0.5);
        const minusHalfPenetration: Vector2 = halfPenetration.factor(-1);
        particle.handleCollision(halfPenetration);
        collide.handleCollision(minusHalfPenetration);

    }

}