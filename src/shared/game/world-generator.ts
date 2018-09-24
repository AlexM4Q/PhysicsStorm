import World from "./world";
import Block from "./entities/block";
import Vector2 from "../data/vector2";
import {worldWidth} from "../constants";

export default class WorldGenerator {

    private readonly _world: World;

    public constructor(world: World) {
        this._world = world;
    }

    public generate(): void {
        this._world.addObject(new Block(new Vector2(worldWidth / 2, 150), new Vector2(worldWidth / 2 - 50, 20)));
    }

}