import ClientContext from "./game/client-context";
import {container, TYPES} from "../shared/inversify.config";
import InputController from "./game/input-controller";

TYPES["CLIENT_CONTEXT"] = Symbol.for(ClientContext.toString());
TYPES["INPUT_CONTROLLER"] = Symbol.for(InputController.toString());

container.bind<ClientContext>(TYPES.CLIENT_CONTEXT).toSelf().inSingletonScope();
container.bind<InputController>(TYPES.INPUT_CONTROLLER).toSelf().inSingletonScope();