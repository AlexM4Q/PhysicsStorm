import {container, TYPES} from "../shared/inversify.config";
import ServerContext from "./game/server-context";

TYPES["SERVER_CONTEXT"] = Symbol.for(ServerContext.toString());

container.bind<ServerContext>(TYPES.SERVER_CONTEXT).toSelf().inSingletonScope();