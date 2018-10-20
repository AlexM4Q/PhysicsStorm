import "./app.css";
import React, {Component, ReactNode} from "react";
import {clientContainer} from "./inversify.config";
import {CLIENT_TYPES} from "./inversify.types";
import InputController from "./game/input-controller";
import {isMobile} from "./utils/app-utils";

export default class App extends Component {

    private readonly _inputController: InputController;

    public constructor(props: any) {
        super(props);

        this._inputController = clientContainer.get<InputController>(CLIENT_TYPES.InputController);
    }

    public componentDidMount(): void {
        this._inputController.startGame();
    }

    public render(): ReactNode {
        const width: number = window.innerWidth;
        const height: number = window.innerHeight;

        if (isMobile) {
            return (
                <div>
                    <canvas
                        id="scene"
                        width={width}
                        height={height}
                        onTouchStart={this._inputController.onClick.bind(this._inputController)}
                    />

                    <div
                        id="left"
                        onTouchStart={this._inputController.left.bind(this._inputController, true)}
                        onTouchEnd={this._inputController.left.bind(this._inputController, false)}
                    />

                    <div
                        id="right"
                        onTouchStart={this._inputController.right.bind(this._inputController, true)}
                        onTouchEnd={this._inputController.right.bind(this._inputController, false)}
                    />

                    <div
                        id="jump"
                        onTouchStart={this._inputController.jump.bind(this._inputController)}
                    />
                </div>
            );
        } else {
            document.addEventListener("keydown", this._inputController.onKeyDown.bind(this._inputController));
            document.addEventListener("keyup", this._inputController.onKeyUp.bind(this._inputController));

            return (
                <canvas
                    id="scene"
                    width={width}
                    height={height}
                    onClick={this._inputController.onClick.bind(this._inputController)}
                />
            );
        }
    }

}