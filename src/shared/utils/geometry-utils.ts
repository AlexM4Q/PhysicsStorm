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
        const n: Vector2 = circleB.position.subtract(boxA.position);

        // Ближайшая к центру B точка A
        let closest: Vector2 = n;

        // Вычисление половины ширины вдоль каждой оси
        const x_extent: number = boxA.halfSize.x;
        const y_extent: number = boxA.halfSize.y;

        // Ограничиваем точку ребром AABB
        closest.x = closest.x < -x_extent ? -x_extent : x_extent < closest.x ? x_extent : closest.x;
        closest.y = closest.y < -y_extent ? -y_extent : y_extent < closest.y ? y_extent : closest.y;

        let inside: boolean = false;

        // Окружность внутри AABB, поэтому нам нужно ограничить центр окружности
        // до ближайшего ребра
        if (n == closest) {
            inside = true;

            // Находим ближайшую ось
            if (Math.abs(n.x) > Math.abs(n.y)) {
                // Отсекаем до ближайшей ширины
                if (closest.x > 0)
                    closest.x = x_extent;
                else
                    closest.x = -x_extent;
            }

            // ось y короче
            else {
                // Отсекаем до ближайшей ширины
                if (closest.y > 0)
                    closest.y = y_extent;
                else
                    closest.y = -y_extent;
            }
        }

        const normal: Vector2 = n.subtract(closest);
        let d: number = normal.lengthSquare;
        const r = circleB.radius;

        // Если радиус меньше, чем расстояние до ближайшей точки и
        // Окружность не находится внутри AABB
        if (d > r * r && !inside)
            return null;

        // Избегаем sqrt, пока он нам не понадобится
        d = Math.sqrt(d);

        // Если окружность была внутри AABB, то нормаль коллизии нужно отобразить
        // в точку снаружи
        if (inside) {
            return n.factor(r - d);
        }
        else {
            return n.factor(d - r);
        }
    }

    public static collideCircleCircle(circleA: Circle, circleB: Circle): Vector2 {
        const dx = circleB.position.x - circleA.position.x;
        const dy = circleB.position.y - circleA.position.y;
        const radiusSum = circleA.radius + circleB.radius;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance >= radiusSum) {
            return null;
        }

        const factor = radiusSum / distance - 1;

        return new Vector2(dx * factor, dy * factor);
    }

}