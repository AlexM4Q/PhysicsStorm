export default abstract class Logger {

    protected readonly _name: string;

    protected constructor(_clazz: any) {
        this._name = _clazz.name;
    }

    public abstract debug(message: any): void;

    public abstract info(message: any): void;

    public abstract warn(message: any): void;

    public abstract error(message: any): void;

}