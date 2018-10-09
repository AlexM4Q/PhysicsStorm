import ConsoleLogger from "./console-logger";
import Logger from "./logger";

export function getLogger(clazz: any): Logger {
    return new ConsoleLogger(clazz);
}