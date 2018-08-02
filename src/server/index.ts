import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import container from "./inversify.config";
import ServerContext from "./game/server-context";
import {serverPort} from "./constants";

class Server {

    private readonly dbUrl: string = "mongodb://localhost:27017/PhysicsStorm";

    private readonly _app: express.Application;

    public constructor() {
        this._app = express();

        this.middleware();
        this.mongoSetup();
        this.routes();

        this._app.listen(serverPort, () => console.log(`Listening on port ${serverPort}!`));

        container.get<ServerContext>(ServerContext).startServer(this._app);
    }

    private middleware(): void {
        this._app.use(express.static("dist"));
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({extended: false}));
    }

    private mongoSetup(): void {
        mongoose.connect(this.dbUrl, {useNewUrlParser: true});
    }

    private routes(): void {
        // this._app.use("/api/v1/users", UsersApi);
    }

}

new Server();