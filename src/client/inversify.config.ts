import "reflect-metadata";
import container from "../shared/inversify.config";
import ClientContext from "./game/client-context";
import InputController from "./game/input-controller";

container.bind<ClientContext>(ClientContext).toSelf().inSingletonScope();
container.bind<InputController>(InputController).toSelf().inSingletonScope();

export default container;