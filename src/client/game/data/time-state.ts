import Particles from "../../../shared/game/data/particles";

export default class TimeState {

    public readonly timestamp: number;

    public readonly particles: Particles;

    public constructor(timestamp: number, particles: Particles) {
        this.timestamp = timestamp;
        this.particles = particles;
    }

}