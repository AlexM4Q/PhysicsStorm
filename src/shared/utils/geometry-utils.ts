import Shape from "../game/shapes/shape";
import Box from "../game/shapes/box";
import Circle from "../game/shapes/circle";
import Vector2 from "../data/vector2";
import GJK from "../game/shapes/geometry/gjk";

export default class GeometryUtils {

    private static readonly _gjk: GJK = new GJK();

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
        let dx = boxA.position.x - boxB.position.x;
        const widthSum = boxA.halfSize.x + boxB.halfSize.x;
        if (-widthSum < dx && dx < widthSum) {
            if (dx < 0) {
                dx += widthSum;
            } else {
                dx -= widthSum;
            }
        } else {
            return null;
        }

        let dy = boxA.position.y - boxB.position.y;
        const heightSum = boxA.halfSize.y + boxB.halfSize.y;
        if (-heightSum < dy && dy < heightSum) {
            if (dy < 0) {
                dy += heightSum;
            } else {
                dy -= heightSum;
            }
        } else {
            return null;
        }

        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx < absDy) {
            return new Vector2(dx, 0);
        }

        if (absDx > absDy) {
            return new Vector2(0, dy);
        }

        return new Vector2(dx, dy);
    }

    public static collideBoxCircle(boxA: Box, circleB: Circle): Vector2 {
        let dx;
        if (boxA.position.x < circleB.position.x) {
            const rightBox = boxA.position.x + boxA.halfSize.x;
            const leftCircle = circleB.position.x - circleB.radius;

            if (rightBox <= leftCircle) {
                return null;
            }

            dx = leftCircle - rightBox;
        } else {
            const leftBox = boxA.position.x - boxA.halfSize.x;
            const rightCircle = circleB.position.x + circleB.radius;

            if (rightCircle <= leftBox) {
                return null;
            }

            dx = rightCircle - leftBox;
        }

        let dy;
        if (boxA.position.y < circleB.position.y) {
            const topBox = boxA.position.y + boxA.halfSize.y;
            const bottomCircle = circleB.position.y - circleB.radius;

            if (topBox <= bottomCircle) {
                return null;
            }

            dy = bottomCircle - topBox;
        } else {
            const bottomBox = boxA.position.y - boxA.halfSize.y;
            const topCircle = circleB.position.y + circleB.radius;

            if (topCircle <= bottomBox) {
                return null;
            }

            dy = topCircle - bottomBox;
        }

        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx < absDy) {
            return new Vector2(dx, 0);
        }

        if (absDx > absDy) {
            return new Vector2(0, dy);
        }

        return new Vector2(dx, dy);
    }

    public static collideCircleCircle(circleA: Circle, circleB: Circle): Vector2 {
        const dx = circleB.position.x - circleA.position.x;
        const dy = circleB.position.y - circleA.position.y;
        const radiusSum = circleA.radius + circleB.radius;
        const distanceSquare = dx * dx + dy * dy;

        if (distanceSquare >= radiusSum * radiusSum) {
            return null;
        }

        const factor = radiusSum / Math.sqrt(distanceSquare) - 1;

        return new Vector2(dx * factor, dy * factor);
    }

}