import GameClient from "./game-client";
import Renderer from "./display/renderer";
import Render from "./display/renders/render";

export const client = new GameClient("ws://localhost:8081");

export function startGame() {
    const scene = document.getElementById("scene");
    const renderer = new Renderer(scene);
    client.onMessage = (message) => {
        const data = JSON.parse(message.data);

        switch (data.type) {
            case 'state':
                renderer.renders = data.renders.map(r => new Render(r));
                break;
        }
    };
}
