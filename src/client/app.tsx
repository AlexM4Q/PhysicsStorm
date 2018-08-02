import "./app.css";
import * as React from "react";
import ClientContext from "./game/client-context";
import InputController from "./game/input-controller";
import container from "./inversify.config";

export default class App extends React.Component {

    private readonly _clientContext: ClientContext;
    private readonly _inputController: InputController;

    constructor(props) {
        super(props);

        this._clientContext = container.get(ClientContext);
        this._inputController = container.get(InputController);
    }

    componentDidMount() {
        document.addEventListener('keydown', (e) => this._inputController.onKeyDown(e));
        document.addEventListener('keyup', (e) => this._inputController.onKeyUp(e));
        document.addEventListener('click', (e) => this._inputController.onClick(e));

        this._clientContext.startGame();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', (e) => this._inputController.onKeyDown(e));
        document.removeEventListener('keyup', (e) => this._inputController.onKeyUp(e));
        document.removeEventListener('click', (e) => this._inputController.onClick(e));
    }

    render() {
        return (
            <canvas id="scene" width="500" height="500"/>
        );
    }

}