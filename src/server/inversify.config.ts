import "reflect-metadata";
import container from "../shared/inversify.config";
import ServerContext from "./game/server-context";

container.bind<ServerContext>(ServerContext).toSelf().inSingletonScope();

export default container;