import Player from "./entities/player";
import Particle from "./entities/physics/particle";
import {physicInterval} from "../constants";
import {injectable} from "inversify";

@injectable()
export default class World {

    private objects: any[];
    private lastUpdate: number;

    public constructor() {
        console.log("world created");
    }

    public get state() {
        return this.objects;
    }

    public get players() {
        return this.objects.filter(o => o instanceof Player);
    }

    public start(): void {
        setInterval(() => {
            const now = Date.now();
            const dt = now - this.lastUpdate;
            this.lastUpdate = now;

            for (let i = 0; i < this.objects.length; i++) {
                const object = this.objects[i];

                if (object instanceof Particle) {
                    object.move(dt);
                }

                if (object.position.y < 0) object.position.y = 0;
            }
        }, physicInterval);
    }

    public addObject(object): void {
        this.objects.push(object);
    }

    public remove(id): void {
        this.objects = this.objects.filter(x => x.id !== id);
    }
}