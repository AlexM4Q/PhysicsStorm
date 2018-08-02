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
        document.addEventListener('keydown', this._inputController.onKeyDown);
        document.addEventListener('keyup', this._inputController.onKeyUp);
        document.addEventListener('click', this._inputController.onClick);

        this._clientContext.startGame();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._inputController.onKeyDown);
        document.removeEventListener('keyup', this._inputController.onKeyUp);
        document.removeEventListener('click', this._inputController.onClick);
    }

    render() {
        return (
            <canvas id="scene" width="500" height="500"/>
        );
    }

}