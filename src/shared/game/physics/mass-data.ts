import Updatable from "../base/updatable";

export default class MassData implements Updatable<MassData> {

    /**
     * Масса
     */
    private _mass: number;
    private _inverse_mass: number;

    /**
     * Момент инерции
     */
    private _inertia: number;
    private _inverse_inertia: number;

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
            this._inverse_mass = 1 / value;
        } else {
            this._mass = 0;
            this._inverse_mass = 0;
        }
    }

    public get inverse_mass(): number {
        return this._inverse_mass;
    }

    public get inertia(): number {
        return this._inertia;
    }

    public set inertia(value: number) {
        if (value) {
            this._inertia = value;
            this._inverse_inertia = 1 / value;
        } else {
            this._inertia = 0;
            this._inverse_inertia = 0;
        }
    }

    public get inverse_inertia(): number {
        return this._inverse_inertia;
    }

    public updateBy(massData: MassData): void {
        this._mass = massData._mass;
        this._inverse_mass = massData._inverse_mass;
        this._inertia = massData._inertia;
        this._inverse_inertia = massData._inverse_inertia;
    }

}