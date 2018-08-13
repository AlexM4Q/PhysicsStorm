import Shape from "../game/entities/shapes/shape";
import Box from "../game/entities/shapes/box";
import Circle from "../game/entities/shapes/circle";

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

    public static collideBoxBox(): boolean {
        return false;
    }

}