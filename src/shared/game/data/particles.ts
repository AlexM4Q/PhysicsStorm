import Particle from "../physics/particle";

export default class Particles {

    public readonly map: { [id: string]: Particle } = {};

    public setObject(gameObject: Particle): void {
        this.map[gameObject.id] = gameObject;
    }

    public getObject(id: string): Particle {
        return this.map[id];
    }

    public removeObject(id: string): void {
        delete this.map[id];
    }

    public toArray(): Particle[] {
        return Object.values(this.map);
    }

}