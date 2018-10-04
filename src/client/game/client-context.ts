import Renderer from "./renderer";
import {WS_KEY_DATA, WS_KEY_ID, WS_KEY_TYPE, WS_KEY_TYPE_REMOVE, WS_KEY_TYPE_STATE} from "../../shared/constants-ws";
import {decorate, inject, injectable} from "inversify";
import {CLIENT_TYPES} from "../inversify.types";
import GameClient from "./game-client";
import World from "../../shared/game/world";
import Vector2 from "../../shared/data/vector2";
import Particle from "../../shared/game/physics/particle";
import Player from "../../shared/game/entities/player";

export default class ClientContext {

    private readonly _world: World;

    private readonly _client: GameClient;

    private _player: Player;

    public constructor(world: World) {
        this._world = world;
        this._client = new GameClient();
    }

    public startGame(): void {
        const scene: HTMLCanvasElement = document.getElementById("scene") as HTMLCanvasElement;
        const renderer: Renderer = new Renderer(scene);

        this._world.onWorldUpdate = () => renderer.draw(this._world.particles);
        this._world.start();

        this._client.onRegister = (id: string) => {
            this._world.addObject(this._player = Player.createNew(id));
        };

        this._client.onMessage = (message: any) => {
            if (!this._player) {
                return;
            }

            switch (message[WS_KEY_TYPE]) {
                case WS_KEY_TYPE_STATE:
                    this._world.update(message[WS_KEY_DATA] as Particle[]);
                    break;
                case WS_KEY_TYPE_REMOVE:
                    this._world.remove(message[WS_KEY_ID] as string);
                    break;
            }
        };
    }

    public right(): void {
        this._player.right();
        this._client.right();
    }

    public left(): void {
        this._player.left();
        this._client.left();
    }

    public stop(): void {
        this._player.stop();
        this._client.stop();
    }

    public jump(): void {
        this._player.jump();
        this._client.jump();
    }

    public click(target: Vector2): void {
        this._player.shoot(target);
        this._client.click(target);
    }

}

decorate(injectable(), ClientContext);
decorate(inject(CLIENT_TYPES.World) as any, ClientContext, 0);
decorate(inject(CLIENT_TYPES.Player) as any, ClientContext, 1);
