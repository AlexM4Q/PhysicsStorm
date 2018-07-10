export default class Renderer {
    constructor(scene) {
        this._renders = [];

        const drawInterval = 1000 / 60;

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