import World from "./world";
import Block from "./entities/block";
import Vector from "../data/vector";

export default class WorldGenerator {

    private readonly _world: World;

    public constructor(world: World) {
        this._world = world;

        this.generate();
    }

    public generate(): void {
        this._world.addObject(new Block(new Vector(50, 50), new Vector(100, 10)));
    }

}