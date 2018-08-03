import Logger from "./logger";

export default class ConsoleLogger implements Logger {

    constructor(private readonly clazz: string) {
    }

    public debug(message: string): void {
        console.log(`${this.clazz}: ${message}`);
    }

    public info(message: string): void {
        console.log(`${this.clazz}: ${message}`);
    }

    public warn(message: string): void {
        console.log(`${this.clazz}: ${message}`);
    }

    public error(message: string): void {
        console.log(`${this.clazz}: ${message}`);
    }

}