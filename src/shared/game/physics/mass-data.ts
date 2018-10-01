import Updatable from "../base/updatable";

export default class MassData implements Updatable<MassData> {

    /**
     * Масса
     */
    private _mass: number;
    private _inverseMass: number;

    /**
     * Момент инерции
     */
    private _inertia: number;
    private _inverseInertia: number;

    constructor(mass: number = 0, inertia: number = 0) {
        this.mass = mass;
        this.inertia = inertia;
    }

    public get mass(): number {
        return this._mass;
    }

    public set mass(value: number) {
        if (value) {
            this._mass = value;
            this._inverseMass = 1 / value;
        } else {
            this._mass = 0;
            this._inverseMass = 0;
        }
    }

    public get inverseMass(): number {
        return this._inverseMass;
    }

    public get inertia(): number {
        return this._inertia;
    }

    public set inertia(value: number) {
        if (value) {
            this._inertia = value;
            this._inverseInertia = 1 / value;
        } else {
            this._inertia = 0;
            this._inverseInertia = 0;
        }
    }

    public get inverseInertia(): number {
        return this._inverseInertia;
    }

    public updateBy(massData: MassData): void {
        if (massData._mass !== undefined) {
            this._mass = massData._mass;
        }

        if (massData._inverseMass !== undefined) {
            this._inverseMass = massData._inverseMass;
        }

        if (massData._inertia !== undefined) {
            this._inertia = massData._inertia;
        }

        if (massData._inverseInertia !== undefined) {
            this._inverseInertia = massData._inverseInertia;
        }
    }

}