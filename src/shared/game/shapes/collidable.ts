import Box from "./box";
import Circle from "./circle";

export default interface Collidable {

    collideBox(box: Box): boolean;

    collideCircle(circle: Circle): boolean;

}