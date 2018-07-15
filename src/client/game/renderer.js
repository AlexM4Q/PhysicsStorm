import {drawInterval} from "../../shared/constants";

export default class Renderer {

    constructor() {
        this._renders = [];
    }

    start(scene) {
        const context = scene.getContext("2d");
        context.transform(1, 0, 0, -1, 0, scene.height);

        setInterval(() => {
            context.clearRect(0, 0, scene.width, scene.height);

            this._renders.forEach(render => render.draw(context))
        }, drawInterval);
    }

    set renders(renders) {
        this._renders = renders;
    }
}