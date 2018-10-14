import http from "http";
import express, {Application} from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {SERVER_PORT} from "./constants";
import ServerContext from "./game/server-context";
import {serverContainer} from "./inversify.config";
import SERVER_TYPES from "./inversify.types";
import Logger from "../shared/logging/logger";
import {getLogger} from "../shared/logging/loggers";

const log: Logger = getLogger({name: "Server"});
const dbUrl: string = "mongodb://localhost:27017/PhysicsStorm";

function start() {
    const app: Application = express();

    middleware(app);
    // this.mongoSetup();
    // this.routes(app);

    const server: http.Server = app.listen(SERVER_PORT, () => log.info(`Listening on port ${SERVER_PORT}!`));

    serverContainer.get<ServerContext>(SERVER_TYPES.ServerContext).startServer(server);
}

function middleware(app: Application): void {
    app.use(express.static("build"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
}

function mongoSetup(): void {
    mongoose.connect(dbUrl, {useNewUrlParser: true});
}

function routes(app: Application): void {
    // app.use("/api/v1/users", UsersApi);
}

start();