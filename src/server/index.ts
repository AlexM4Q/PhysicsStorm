import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {SERVER_PORT} from "./constants";
import ServerContext from "./game/server-context";
import {serverContainer} from "./inversify.config";
import SERVER_TYPES from "./inversify.types";
import Logger from "../shared/logging/logger";
import ConsoleLogger from "../shared/logging/console-logger";
import * as http from "http";

class Server {

    private static readonly log: Logger = new ConsoleLogger(Server);

    private static readonly dbUrl: string = "mongodb://localhost:27017/PhysicsStorm";

    private readonly _app: express.Application;

    public constructor() {
        this._app = express();

        this.middleware();
        // this.mongoSetup();
        // this.routes();

        const server: http.Server = this._app
            .listen(SERVER_PORT, () => Server.log.info(`Listening on port ${SERVER_PORT}!`));

        serverContainer.get<ServerContext>(SERVER_TYPES.ServerContext).startServer(server);
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

new Server();
