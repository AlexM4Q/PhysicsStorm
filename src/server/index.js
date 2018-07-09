const express = require("express");
const bodyParser = require("body-parser");

const mongoClient = require("mongodb").MongoClient;

const dbUrl = "mongodb://localhost:27017/";
const dbName = "PhysicsStorm";

const app = express();
const jsonParser = bodyParser.json();
app.use(express.static("dist"));

app.get("/api/users", function (req, res) {
    mongoClient.connect(dbUrl, function (err, client) {
        client.db(dbName).collection("users").find({}).toArray((err, users) => {
            console.log(users);
            res.send(users);
            client.close();
        });
    });
});

app.post("/api/users", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    var userName = req.body.name;
    var userAge = req.body.age;
    var user = {name: userName, age: userAge};

    mongoClient.connect(dbUrl, function (err, client) {
        client.db(dbName).collection("users").insertOne(user, function (err, result) {

            if (err) return res.status(400).send();

            res.send(user);
            client.close();
        });
    });
});

app.listen(8080, () => console.log("Listening on port 8080!"));

const WebSocketServer = new require('ws');

const clients = {};
const webSocketServer = new WebSocketServer.Server({
    port: 8081
});
webSocketServer.on('connection', function(ws) {

    const id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

    ws.on('message', function(message) {
        console.log('получено сообщение ' + message);

        for (const key in clients) {
            clients[key].send(message);
        }
    });

    ws.on('close', function() {
        console.log('соединение закрыто ' + id);
        delete clients[id];
    });

});