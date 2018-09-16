import Box from "./box";
import Circle from "./circle";
import Vector2 from "../../data/vector2";

export default interface Collidable {

    resolveCollision(penetration: Vector2): void;

    collideBox(box: Box): Vector2;

    collideCircle(circle: Circle): Vector2;

}