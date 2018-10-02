import "./app.css";
import * as React from "react";
import {clientContainer} from "./inversify.config";
import {CLIENT_TYPES} from "./inversify.types";
import InputController from "./game/input-controller";
import {WORLD_HEIGHT, WORLD_WIDTH} from "../shared/constants";

export default class App extends React.Component {

    private readonly _inputController: InputController;

    constructor(props: any) {
        super(props);

        this._inputController = clientContainer.get<InputController>(CLIENT_TYPES.InputController);
    }

    public componentDidMount() {
        document.addEventListener("keydown", (e: any) => this._inputController.onKeyDown(e));
        document.addEventListener("keyup", (e: any) => this._inputController.onKeyUp(e));
        document.addEventListener("click", (e: any) => this._inputController.onClick(e));

        this._inputController.startGame();
    }

    public componentWillUnmount() {
        document.removeEventListener("keydown", (e: any) => this._inputController.onKeyDown(e));
        document.removeEventListener("keyup", (e: any) => this._inputController.onKeyUp(e));
        document.removeEventListener("click", (e: any) => this._inputController.onClick(e));
    }

    public render() {
        return (
            <canvas id="scene" width={WORLD_WIDTH} height={WORLD_HEIGHT}/>
        );
    }

}