import Vector2 from "../../../data/vector2";
import Box from "./box";
import Circle from "./circle";
import Polygon from "./polygon";

export default interface Collidable {

    collideBox(box: Box): Vector2;

    collideCircle(circle: Circle): Vector2;

    collidePolygon(polygon: Polygon): Vector2;

}