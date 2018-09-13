import GameObject from "../../shared/game/base/game-object";

export default class Renderer {

    private readonly _scene: HTMLCanvasElement;

    private readonly _context: CanvasRenderingContext2D;

    public constructor(scene: HTMLCanvasElement) {
        this._scene = scene;
        this._context = scene.getContext("2d");
        this._context.transform(1, 0, 0, -1, 0, scene.height);
    }

    public draw(renders: GameObject[]): void {
        this._context.clearRect(0, 0, this._scene.width, this._scene.height);

        for (let render of renders) {
            render.draw(this._context);
        }
    }

}