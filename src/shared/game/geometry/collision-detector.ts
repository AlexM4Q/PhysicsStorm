import Shape from "./shapes/shape";
import Box from "./shapes/box";
import Circle from "./shapes/circle";
import Vector2 from "../data/vector2";
import Polygon from "./shapes/polygon";
import GJK from "./gjk";

export default class CollisionDetector {

    private static readonly gjk: GJK = new GJK();

    public static collide(shapeA: Shape, shapeB: Shape): Vector2 {
        if (shapeB instanceof Box) {
            return shapeA.collideBox(shapeB);
        }

        if (shapeB instanceof Circle) {
            return shapeA.collideCircle(shapeB);
        }

        if (shapeB instanceof Polygon) {
            return shapeA.collidePolygon(shapeB);
        }

        return undefined;
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
            return undefined;
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
            return undefined;
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
        const leftBox: number = boxA.position.x - boxA.halfSize.x;
        if (leftBox > circleB.position.x) {
            dx = leftBox - circleB.position.x;
            if (dx > circleB.radius) {
                return undefined;
            }
        } else {
            const rightBox: number = boxA.position.x + boxA.halfSize.x;
            if (rightBox < circleB.position.x) {
                dx = rightBox - circleB.position.x;
                if (-dx > circleB.radius) {
                    return undefined;
                }
            } else {
                dx = 0;
            }
        }

        let dy: number;
        const topBox: number = boxA.position.y + boxA.halfSize.y;
        if (topBox < circleB.position.y) {
            dy = topBox - circleB.position.y;
            if (-dy > circleB.radius) {
                return undefined;
            }
        } else {
            const bottomBox: number = boxA.position.y - boxA.halfSize.y;
            if (bottomBox > circleB.position.y) {
                dy = bottomBox - circleB.position.y;
                if (dy > circleB.radius) {
                    return undefined;
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
            return undefined;
        }

        const factor: number = 1 - circleB.radius / distance;

        return new Vector2(dx * factor, dy * factor);
    }

    public static collideCircleCircle(circleA: Circle, circleB: Circle): Vector2 {
        const dx: number = circleB.position.x - circleA.position.x;
        const dy: number = circleB.position.y - circleA.position.y;
        const radiusSum: number = circleA.radius + circleB.radius;
        const distance: number = Math.sqrt(dx * dx + dy * dy);

        if (distance >= radiusSum) {
            return undefined;
        }

        const factor: number = radiusSum / distance - 1;

        return new Vector2(dx * factor, dy * factor);
    }

    public static collideShapeShape(shapeA: Shape, shapeB: Shape): Vector2 {
        return CollisionDetector.gjk.interpenetration(shapeA, shapeB);
    }

}