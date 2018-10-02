import Logger from "./logger";

export default class ConsoleLogger implements Logger {

    constructor(private readonly clazz: any) {
    }

    public debug(message: any): void {
        console.log(`${this.clazz.name}: ${message}`, {
            color: "#00ff00"
        });
    }

    public info(message: any): void {
        console.log(`${this.clazz.name}: ${message}`, {
            color: "#00ffff"
        });
    }

    public warn(message: any): void {
        console.log(`${this.clazz.name}: ${message}`, {
            color: "#ffff00"
        });
    }

    public error(message: any): void {
        console.log(`${this.clazz.name}: ${message}`, {
            color: "#ff0000"
        });
    }

}