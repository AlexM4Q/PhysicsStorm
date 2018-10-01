import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import {SERVER_PORT} from "./constants";
import ServerContext from "./game/server-context";
import {serverContainer} from "./inversify.config";
import SERVER_TYPES from "./inversify.types";

class Server {

    private static readonly dbUrl: string = "mongodb://localhost:27017/PhysicsStorm";

    private readonly _app: express.Application;

    public constructor() {
        this._app = express();

        this.middleware();
        // this.mongoSetup();
        // this.routes();

        this._app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}!`));

        serverContainer.get<ServerContext>(SERVER_TYPES.ServerContext).startServer(this._app);
    }

    private middleware(): void {
        this._app.use(express.static("build"));
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({extended: false}));
    }

    private mongoSetup(): void {
        mongoose.connect(Server.dbUrl, {useNewUrlParser: true});
    }

    private routes(): void {
        // this._app.use("/api/v1/users", UsersApi);
    }

}

const server = new Server();
