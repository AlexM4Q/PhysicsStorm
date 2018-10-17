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
                        onTouchStart={(e: any) => this._inputController.onClick(e)}/>

                    <div
                        id="left"
                        onTouchStart={() => this._inputController.left(true)}
                        onTouchEnd={() => this._inputController.left(false)}/>

                    <div
                        id="right"
                        onTouchStart={() => this._inputController.right(true)}
                        onTouchEnd={() => this._inputController.right(false)}/>

                    <div id="jump" onTouchStart={() => this._inputController.jump()}/>
                </div>
            );
        } else {
            document.addEventListener("keydown", (e: any) => this._inputController.onKeyDown(e));
            document.addEventListener("keyup", (e: any) => this._inputController.onKeyUp(e));

            return (
                <canvas id="scene"
                        width={width}
                        height={height}
                        onClick={(e: any) => this._inputController.onClick(e)}/>
            );
        }
    }

}