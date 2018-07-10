import GameClient from "./game-client";
import Renderer from "./renderer";
import GameObject from "../../shared/game/objects/entities/game-object";

export const client = new GameClient("ws://localhost:8081");

export function startGame() {
    const scene = document.getElementById("scene");
    const renderer = new Renderer(scene);

    client.onMessage = (message) => {
        const data = JSON.parse(message.data);

        switch (data.type) {
            case 'state':
                renderer.renders = data.state.map(r => new GameObject(r));
                break;
        }
    };
}
