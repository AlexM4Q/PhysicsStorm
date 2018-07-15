import GameClient from "./game-client";
import Renderer from "./renderer";
import GameObject from "../../shared/game/objects/entities/game-object";
import {wsHost} from "../../shared/constants";
import {world} from "../../shared/game/shared-context";

class ClientContext {

    constructor() {
        this.renderer = new Renderer();
        this.client = new GameClient(wsHost);
    }

    startGame() {
        const scene = document.getElementById("scene");

        world.start();
        this.renderer.start(scene);
        this.client.onMessage = (message) => {
            const data = JSON.parse(message.data);

            switch (data.type) {
                case 'state':
                    this.renderer.renders = data.state.map(r => GameObject.cast(r));
                    break;
            }
        };
    }

    right() {
        this.client.right();
    }

    left() {
        this.client.left();
    }

    stop() {
        this.client.stop();
    }

    jump() {
        this.client.jump();
    }

    click(target) {
        this.client.click(target);
    }

}

export const context = new ClientContext();
