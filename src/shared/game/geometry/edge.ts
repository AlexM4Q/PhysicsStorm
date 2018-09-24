import Vector2 from "../../data/vector2";

export default class Edge {

    public distance: number;
    public normal: Vector2;
    public index: number;

    public constructor(distance: number, normal: Vector2, index: number) {
        this.distance = distance;
        this.normal = normal;
        this.index = index;
    }

}