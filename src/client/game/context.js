import GameClient from "./game-client";
import Renderer from "./display/renderer";

export const client = new GameClient("ws://localhost:8081");

export function startGame() {
    const scene = document.getElementById("scene");
    const renderer = new Renderer(scene);
    client.onMessage = (message) => {
        switch (message.type) {
            case 'state':
                renderer.renders = message.renders;
                break;
        }
    };
}
