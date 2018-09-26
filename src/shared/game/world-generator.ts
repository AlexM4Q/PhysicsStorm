import World from "./world";
import Block from "./entities/block";
import Vector2 from "../data/vector2";
import {WORLD_WIDTH} from "../constants";
import {pixelsToMeters} from "../utils/common-utils";
import Ball from "./entities/ball";

export default class WorldGenerator {

    private readonly _world: World;

    public constructor(world: World) {
        this._world = world;
    }

    public generate(): void {
        this._world.addObject(WorldGenerator.createBlock(WORLD_WIDTH / 2, 150, WORLD_WIDTH / 2 - 50, 20));
    }

    /**
     * Создает блок по координатам и размерам
     * @param x координата X в пикселях
     * @param y координата Y в пикселях
     * @param halfWidth ширина в пикселях
     * @param halfHeight высота в пикселях
     */
    public static createBlock(x: number, y: number, halfWidth: number, halfHeight: number): Block {
        return new Block(
            new Vector2(
                pixelsToMeters(x),
                pixelsToMeters(y)
            ),
            new Vector2(
                pixelsToMeters(halfWidth),
                pixelsToMeters(halfHeight)
            )
        );
    }

    /**
     * Создает блок по координатам и размерам
     * @param x координата X в пикселях
     * @param y координата Y в пикселях
     * @param radius радиус в пикселях
     */
    public static createBall(x: number, y: number, radius: number): Ball {
        return new Ball(
            new Vector2(
                pixelsToMeters(x),
                pixelsToMeters(y)
            ),
            pixelsToMeters(radius)
        );
    }

}