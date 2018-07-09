import React, {Component} from 'react';
import './app.css';
import {startGame} from "./game/context";
import {onClick, onKeyDown, onKeyUp} from "./game/controller";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch('/api/users')
            .then(res => res.json())
            .then(users => console.log(users));

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        document.addEventListener('click', onClick);

        startGame();
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