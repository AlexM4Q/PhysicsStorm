import {drawInterval} from "../../shared/constants";
import GameObject from "../../shared/game/base/game-object";

export default class Renderer {

    private _renders: GameObject[] = [];

    public start(scene) {
        const context = scene.getContext("2d");
        context.transform(1, 0, 0, -1, 0, scene.height);

        setInterval(() => {
            context.clearRect(0, 0, scene.width, scene.height);

            this._renders.forEach(render => render.draw(context))
        }, drawInterval);
    }

    public set renders(renders: GameObject[]) {
        this._renders = renders;
    }

}