import Shape from "../game/shapes/shape";
import Box from "../game/shapes/box";
import Circle from "../game/shapes/circle";

export default class GeometryUtils {

    public static collide(shapeA: Shape, shapeB: Shape): boolean {
        if (shapeB instanceof Box) {
            return shapeA.collideBox(shapeB as Box);
        }

        if (shapeB instanceof Circle) {
            return shapeA.collideCircle(shapeB as Circle);
        }

        return false;
    }

    public static collideBoxBox(boxA: Box, boxB: Box): boolean {
        return boxA.position.x + boxA.size.x >= boxB.position.x
            && boxA.position.x <= boxB.position.x + boxB.size.x
            && boxA.position.y + boxA.size.y >= boxB.position.y
            && boxA.position.y <= boxB.position.y + boxB.size.y;
    }

    public static collideBoxCircle(boxA: Box, circleB: Circle): boolean {
        return false;
    }

    public static collideCircleCircle(circleA: Circle, circleB: Circle): boolean {
        const dx = circleA.position.x - circleB.position.x;
        const dy = circleA.position.y - circleB.position.y;
        const radius = circleA.radius + circleB.radius;

        return dx * dx + dy * dy < radius * radius;
    }

}