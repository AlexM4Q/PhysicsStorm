import React, {Component} from 'react';
import './app.css';
import {onClick, onKeyDown, onKeyUp, start} from "./game/logic";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {username: null};
    }

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({username: user.username}));

        start();

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        document.addEventListener('click', onClick);
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