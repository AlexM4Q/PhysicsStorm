import "./app.css";
import * as React from "react";
import ClientContext from "./game/client-context";
import {container, TYPES} from "../shared/inversify.config";
import InputController from "./game/input-controller";

export default class App extends React.Component {

    private readonly clientContext: ClientContext;
    private readonly inputController: InputController;

    constructor(props) {
        super(props);

        this.clientContext = container.get(TYPES.CLIENT_CONTEXT);
        this.inputController = container.get(TYPES.INPUT_CONTROLLER);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.inputController.onKeyDown);
        document.addEventListener('keyup', this.inputController.onKeyUp);
        document.addEventListener('click', this.inputController.onClick);

        this.clientContext.startGame();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.inputController.onKeyDown);
        document.removeEventListener('keyup', this.inputController.onKeyUp);
        document.removeEventListener('click', this.inputController.onClick);
    }

    render() {
        return (
            <canvas id="scene" width="500" height="500"/>
        );
    }

}