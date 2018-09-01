import "reflect-metadata";
import Particle from "./physics/particle";
import {physicInterval} from "../constants";
import {injectable} from "inversify";
import GameObject from "./base/game-object";
import Vector2 from "../data/vector2";
import RigidBody from "./physics/rigid-body";
import WorldGenerator from "./world-generator";
import GJK from "./shapes/geometry/gjk";
import Player from "./entities/player";

@injectable()
export default class World {

    private _particles: Particle[] = [];
    private _lastUpdate: number;

    public get state(): Particle[] {
        return this._particles;
    }

    public start(): void {
        new WorldGenerator(this).generate();

        setInterval(() => {
            const now = Date.now();
            const dt = now - this._lastUpdate;
            this._lastUpdate = now;

            for (let particle of this._particles) {

                if (particle instanceof Particle) {
                    particle.step(dt);
                }

                if (particle.position.y < 0) {
                    particle.position = new Vector2(particle.position.x, 0);
                    if (particle instanceof RigidBody) {
                        const rigidBody = particle as RigidBody;
                        rigidBody.linearVelocity = new Vector2(rigidBody.linearVelocity.x, 0);
                    }
                }

                const gjk: GJK = new GJK();
                for (let collide of this._particles) {
                    if (particle.id === collide.id) continue;
                    let vector2 = gjk.intersect(particle.shape, collide.shape);
                    if (vector2) {
                        // if (GeometryUtils.collide(particle.shape, collide.shape)) {

                        if (particle instanceof Player) {
                            if (particle.position.y > 0)
                                console.log(`p(${particle.position.x}:${particle.position.y}) v(${vector2.x}:${vector2.y})`);

                            particle.position = new Vector2(particle.position.x - vector2.x, particle.position.y - vector2.y);
                            particle._force = Vector2.ZERO;
                        }
                    }
                }
            }
        }, physicInterval);
    }

    public get particles(): GameObject[] {
        return this._particles;
    }

    public addObject(object): void {
        this._particles.push(object);
    }

    public remove(id): void {
        this._particles = this._particles.filter(x => x.id !== id);
    }

    public update(state: Particle[]): void {
        for (let object of state) {
            for (let gameObject of this._particles) {
                if (object.id === gameObject.id) {
                    gameObject.updateBy(object);
                    break;
                }
            }
        }
    }
}