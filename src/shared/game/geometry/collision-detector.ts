import Shape from "./shapes/shape";
import Box from "./shapes/box";
import Circle from "./shapes/circle";
import Vector2 from "../../data/vector2";

export default class CollisionDetector {

    public static collide(shapeA: Shape, shapeB: Shape): Vector2 {
        if (shapeB instanceof Box) {
            return shapeA.collideBox(shapeB as Box);
        }

        if (shapeB instanceof Circle) {
            return shapeA.collideCircle(shapeB as Circle);
        }

        return null;
    }

    public static collideBoxBox(boxA: Box, boxB: Box): Vector2 {
        return CollisionDetector.collideBoxBoxAbstract(boxA.position, boxA.halfSize.x, boxA.halfSize.y, boxB.position, boxB.halfSize.x, boxB.halfSize.y);
    }

    private static collideBoxBoxAbstract(positionA: Vector2, halfWidthA: number, halfHeightA: number, positionB: Vector2, halfWidthB: number, halfHeightB: number): Vector2 {
        let dx: number = positionA.x - positionB.x;
        const widthSum: number = halfWidthA + halfWidthB;
        if (-widthSum <= dx && dx <= widthSum) {
            if (dx < 0) {
                dx += widthSum;
            } else {
                dx -= widthSum;
            }
        } else {
            return null;
        }

        let dy: number = positionA.y - positionB.y;
        const heightSum: number = halfHeightA + halfHeightB;
        if (-heightSum <= dy && dy <= heightSum) {
            if (dy < 0) {
                dy += heightSum;
            } else {
                dy -= heightSum;
            }
        } else {
            return null;
        }

        const absDx: number = Math.abs(dx);
        const absDy: number = Math.abs(dy);

        if (absDx < absDy) {
            return new Vector2(dx, 0);
        }

        if (absDx > absDy) {
            return new Vector2(0, dy);
        }

        return new Vector2(dx, dy);
    }

    public static collideBoxCircle(boxA: Box, circleB: Circle): Vector2 {
        let dx: number;
        const leftBox = boxA.position.x - boxA.halfSize.x;
        if (leftBox > circleB.position.x) {
            dx = leftBox - circleB.position.x;
            if (dx > circleB.radius) {
                return null;
            }
        } else {
            const rightBox = boxA.position.x + boxA.halfSize.x;
            if (rightBox < circleB.position.x) {
                dx = rightBox - circleB.position.x;
                if (-dx > circleB.radius) {
                    return null;
                }
            } else {
                dx = 0;
            }
        }

        let dy: number;
        const topBox = boxA.position.y + boxA.halfSize.y;
        if (topBox < circleB.position.y) {
            dy = topBox - circleB.position.y;
            if (-dy > circleB.radius) {
                return null;
            }
        } else {
            const bottomBox = boxA.position.y - boxA.halfSize.y;
            if (bottomBox > circleB.position.y) {
                dy = bottomBox - circleB.position.y;
                if (dy > circleB.radius) {
                    return null;
                }
            } else {
                dy = 0;
            }
        }

        if (!(dx || dy)) {
            return CollisionDetector.collideBoxBoxAbstract(boxA.position, boxA.halfSize.x, boxA.halfSize.y, circleB.position, circleB.radius, circleB.radius);
        }

        const distance: number = Math.sqrt(dx * dx + dy * dy);
        if (distance >= circleB.radius) {
            return null;
        }

        const factor = circleB.radius / distance - 1;

        return new Vector2(dx * factor, dy * factor);
    }

    public static collideCircleCircle(circleA: Circle, circleB: Circle): Vector2 {
        const dx: number = circleB.position.x - circleA.position.x;
        const dy: number = circleB.position.y - circleA.position.y;
        const radiusSum: number = circleA.radius + circleB.radius;
        const distance: number = Math.sqrt(dx * dx + dy * dy);

        if (distance >= radiusSum) {
            return null;
        }

        const factor: number = radiusSum / distance - 1;

        return new Vector2(dx * factor, dy * factor);
    }

}