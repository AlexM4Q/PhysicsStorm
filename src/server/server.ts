import express from "express";
import bodyParser from "body-parser";
import {container, TYPES} from "../shared/inversify.config";
import ServerContext from "./game/server-context";
import {UsersApi} from "./api/users-api";
import * as mongoose from "mongoose";

export default class Server {

    private dbUrl: string = "mongodb://localhost:27017/PhysicsStorm";

    private app: express.Application;

    public constructor() {
        this.app = express();

        this.middleware();
        this.mongoSetup();
        this.routes();

        this.app.listen(8080, () => console.log("Listening on port 8080!"));
        container.get<ServerContext>(TYPES.SERVER_CONTEXT).startServer();
    }

    private middleware(): void {
        this.app.use(express.static("dist"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    private mongoSetup(): void {
        mongoose.connect(this.dbUrl);
    }

    private routes(): void {
        this.app.use('/api/v1/users', UsersApi);
    }

}

new Server();