import "./app.css";
import * as React from "react";
import {clientContainer} from "./inversify.config";
import {CLIENT_TYPES} from "./inversify.types";
import InputController from "./game/input-controller";
import {worldHeight, worldWidth} from "../shared/constants";

export default class App extends React.Component {

    private readonly _inputController: InputController;

    constructor(props) {
        super(props);

        this._inputController = clientContainer.get<InputController>(CLIENT_TYPES.InputController);
    }

    componentDidMount() {
        document.addEventListener('keydown', (e) => this._inputController.onKeyDown(e));
        document.addEventListener('keyup', (e) => this._inputController.onKeyUp(e));
        document.addEventListener('click', (e) => this._inputController.onClick(e));

        this._inputController.startGame();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', (e) => this._inputController.onKeyDown(e));
        document.removeEventListener('keyup', (e) => this._inputController.onKeyUp(e));
        document.removeEventListener('click', (e) => this._inputController.onClick(e));
    }

    render() {
        return (
            <canvas id="scene" width={worldWidth} height={worldHeight}/>
        );
    }

}