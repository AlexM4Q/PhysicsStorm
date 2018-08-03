import "reflect-metadata";
import container from "../shared/inversify.config";
import SERVER_TYPES from "./inversify.types";
import ServerContext from "./game/server-context";

container.bind(SERVER_TYPES.ServerContext).to(ServerContext).inSingletonScope();

export const serverContainer = container;