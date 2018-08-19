import World from "./world";
import Block from "./entities/block";
import Vector from "../data/vector";

export default class WorldGenerator {

    private readonly _world: World;

    public constructor(world: World) {
        this._world = world;
    }

    public generate(): void {
        this._world.addObject(new Block(new Vector(100, 100), new Vector(100, 10)));
    }

}