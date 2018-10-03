import "./app.css";
import React, {ReactNode} from "react";
import {clientContainer} from "./inversify.config";
import {CLIENT_TYPES} from "./inversify.types";
import InputController from "./game/input-controller";
import {WORLD_HEIGHT, WORLD_WIDTH} from "../shared/constants";

export default class App extends React.Component {

    private readonly _inputController: InputController;

    public constructor(props: any) {
        super(props);

        this._inputController = clientContainer.get<InputController>(CLIENT_TYPES.InputController);
    }

    public componentDidMount(): void {
        document.addEventListener("keydown", (e: any) => this._inputController.onKeyDown(e));
        document.addEventListener("keyup", (e: any) => this._inputController.onKeyUp(e));
        document.addEventListener("click", (e: any) => this._inputController.onClick(e));

        this._inputController.startGame();
    }

    public render(): ReactNode {
        return (
            <canvas id="scene" width={WORLD_WIDTH} height={WORLD_HEIGHT}/>
        );
    }

}