// import {start} from "./src/logic.js";
//
// start();

// const path = require('path');
// const express = require('express');
// const hbs = require('express-handlebars');
//
// const app = express();
//
// app.engine('.hbs', hbs({
//     defaultLayout: 'main',
//     extname: '.hbs',
//     layoutsDir: path.join(__dirname, 'src/views/layouts')
// }));
//
// app.set('view engine', '.hbs');
// app.set('views', path.join(__dirname, 'src/views'));
// app.get('/', (request, response) => {
//     response.render('home', {
//         name: 'John'
//     })
// });
//
// app.listen(3001);


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));