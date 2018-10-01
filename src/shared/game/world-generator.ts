import World from "./world";
import Block from "./entities/block";
import Vector2 from "../data/vector2";
import {WORLD_WIDTH} from "../constants";
import {pixelsToMeters} from "../utils/common-utils";
import Ball from "./entities/ball";
import Stone from "./entities/stone";
import Cube from "./entities/cube";

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
     * Создает шар по координатам и радиусу
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

    /**
     * Создает кубик по координатам и размерам
     * @param x координата X в пикселях
     * @param y координата Y в пикселях
     * @param halfWidth ширина в пикселях
     * @param halfHeight высота в пикселях
     */
    public static createCube(x: number, y: number, halfWidth: number, halfHeight: number): Cube {
        return new Cube(
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
     * Создает камень по координатам и размерам
     * @param x координата X в пикселях
     * @param y координата Y в пикселях
     * @param vertices относительные координаты в пикселях
     */
    public static createStone(x: number, y: number, vertices: Vector2[]): Stone {
        return new Stone(
            new Vector2(
                pixelsToMeters(x),
                pixelsToMeters(y)
            ),
            vertices.map(v => v.change(pixelsToMeters))
        );
    }

    /**
     * Создает случайных размеров камень по координатам
     * @param x координата X в пикселях
     * @param y координата Y в пикселях
     */
    public static createRandomStone(x: number, y: number) {
        const vertices: Vector2[] = [];

        vertices.push(new Vector2(0, 10));
        // vertices.push(new Vector2(7, 7));
        vertices.push(new Vector2(10, 0));
        // vertices.push(new Vector2(7, -7));
        vertices.push(new Vector2(0, -10));
        // vertices.push(new Vector2(-7, -7));
        vertices.push(new Vector2(-10, 0));
        // vertices.push(new Vector2(-7, 7));

        return WorldGenerator.createStone(x, y, vertices);
    }

}