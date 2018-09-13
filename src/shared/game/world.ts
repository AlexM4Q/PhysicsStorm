import "reflect-metadata";
import Particle from "./physics/particle";
import {g, physicInterval} from "../constants";
import {injectable} from "inversify";
import GameObject from "./base/game-object";
import Vector2 from "../data/vector2";
import RigidBody from "./physics/rigid-body";
import WorldGenerator from "./world-generator";
import Player from "./entities/player";
import GeometryUtils from "../utils/geometry-utils";

@injectable()
export default class World {

    private _particles: Particle[] = [];

    public get particles(): GameObject[] {
        return this._particles;
    }

    private _onPhysicsUpdate: any;

    public set onPhysicsUpdate(onPhysicsUpdate: any) {
        this._onPhysicsUpdate = onPhysicsUpdate;
    }

    public start(): void {
        new WorldGenerator(this).generate();

        let lastUpdate: number = Date.now();
        setInterval(() => {
            const now = Date.now();
            const dt = now - lastUpdate;
            lastUpdate = now;

            this.updatePhysics(dt / 1000);
        }, physicInterval);
    }

    public addObject(object: Particle): void {
        this._particles.push(object);
    }

    public remove(id: string): void {
        this._particles = this._particles.filter(x => x.id !== id);
    }

    public updatePhysics(dt: number): void {
        for (let particle of this._particles) {

            particle.step(dt);

            if (particle.position.y < 0) {
                particle.position = new Vector2(particle.position.x, 0);
                if (particle instanceof RigidBody) {
                    const rigidBody = particle as RigidBody;
                    rigidBody.linearVelocity = new Vector2(rigidBody.linearVelocity.x, 0);
                }
            }

            for (let collide of this._particles) {
                if (particle.id === collide.id) continue;
                let vector2 = GeometryUtils.collide(particle.shape, collide.shape);
                if (vector2) {
                    console.log(vector2);
                    // if (GeometryUtils.collide(particle.shape, collide.shape)) {

                    if (particle instanceof Player) {
                        // if (particle.position.y > 0)

                        particle.position = new Vector2(particle.position.x - vector2.x, particle.position.y - vector2.y);
                        // particle._force = Vector2.ZERO;

                        if (vector2.y < 0) {
                            let force = new Vector2(0, -particle.massData.mass * g);
                            particle.addForce(force);
                        }
                        // console.log(`p(${particle.position.x}:${particle.position.y}) v(${vector2.x}:${vector2.y}) f(${force.x}:${force.y})`);
                    }
                }
            }
        }

        this._onPhysicsUpdate && this._onPhysicsUpdate();
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