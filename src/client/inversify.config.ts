import "reflect-metadata";
import container from "../shared/inversify.config";
import {CLIENT_TYPES} from "./inversify.types";
import ClientContext from "./game/client-context";
import InputController from "./game/input-controller";

container.bind(CLIENT_TYPES.ClientContext).to(ClientContext).inSingletonScope();
container.bind(CLIENT_TYPES.InputController).to(InputController).inSingletonScope();

export const clientContainer = container;