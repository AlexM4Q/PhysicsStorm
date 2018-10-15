import Particles from "../../shared/game/data/particles";
import Vector2 from "../../shared/game/data/vector2";
import Particle from "../../shared/game/physics/particle";
import Viewport from "../../shared/game/data/viewport";
import {metersToPixels} from "../../shared/utils/common-utils";

export default class Renderer {

    private readonly _scene: HTMLCanvasElement;

    private readonly _context: CanvasRenderingContext2D;

    public constructor(scene: HTMLCanvasElement) {
        this._scene = scene;
        this._context = scene.getContext("2d");
        this._context.transform(1, 0, 0, -1, 0, scene.height);
    }

    public draw(particles: Particles, position: Vector2 = Vector2.ZERO): void {
        const width: number = this._scene.width;
        const height: number = this._scene.height;
        this._context.clearRect(0, 0, width, height);

        const viewport: Viewport = new Viewport(new Vector2(
            -metersToPixels(position.x) + width / 2,
            -metersToPixels(position.y) + height / 2
        ));

        for (const id in particles.map) {
            const particle: Particle = particles.getObject(id);
            if (particle) {
                particle.draw(this._context, viewport);
            }
        }
    }

}