import React, {Component} from 'react';
import './app.css';
import {context} from "./game/client-context";
import {onClick, onKeyDown, onKeyUp} from "./game/controller";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        document.addEventListener('click', onClick);

        context.startGame();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('keyup', onKeyUp);
        document.removeEventListener('click', onClick);
    }

    render() {
        return (
            <canvas id="scene" width="500" height="500"/>
        );
    }
}