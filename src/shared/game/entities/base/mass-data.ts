import Updatable from "./updatable";

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

    constructor(mass: number, inertia: number) {
        this.mass = mass;
        this.inertia = inertia;
    }

    public get mass(): number {
        return this._mass;
    }

    public set mass(value: number) {
        this._mass = value;
        this._inverse_mass = 1 / value;
    }

    public get inverse_mass(): number {
        return this._inverse_mass;
    }

    public get inertia(): number {
        return this._inertia;
    }

    public set inertia(value: number) {
        this._inertia = value;
        this._inverse_inertia = 1 / value;
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