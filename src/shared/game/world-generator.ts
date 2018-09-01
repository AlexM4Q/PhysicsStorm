import World from "./world";
import Block from "./entities/block";
import Vector2 from "../data/vector2";

export default class WorldGenerator {

    private readonly _world: World;

    public constructor(world: World) {
        this._world = world;
    }

    public generate(): void {
        this._world.addObject(new Block(new Vector2(200, 100), new Vector2(50, 10)));
        this._world.addObject(new Block(new Vector2(300, 5), new Vector2(50, 10)));
    }

}