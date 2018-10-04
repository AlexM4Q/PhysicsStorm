import Particles from "../../shared/data/particles";

export default class Renderer {

    private readonly _scene: HTMLCanvasElement;

    private readonly _context: CanvasRenderingContext2D;

    public constructor(scene: HTMLCanvasElement) {
        this._scene = scene;
        this._context = scene.getContext("2d");
        this._context.transform(1, 0, 0, -1, 0, scene.height);
    }

    public draw(particles: Particles): void {
        this._context.clearRect(0, 0, this._scene.width, this._scene.height);

        for (const id in particles.map) {
            particles.getObject(id).draw(this._context);
        }
    }

}