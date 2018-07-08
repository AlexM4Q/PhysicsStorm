const express = require("express");
const bodyParser = require("body-parser");

const mongoClient = require("mongodb").MongoClient;

const dbUrl = "mongodb://localhost:27017/";
const dbName = "PhysicsStorm";

mongoClient.connect(dbUrl, function(err, client){
    const db = client.db("PhysicsStorm");
    const collection = db.collection("users");
    let user = {name: "Tom", age: 23};
    collection.insertOne(user, function(err, result){

        if(err){
            return console.log(err);
        }
        console.log(result.ops);
        client.close();
    });
});

const app = express();
const jsonParser = bodyParser.json();
app.use(express.static("dist"));

app.get("/api/users", function(req, res){
    mongoClient.connect(dbUrl, function(err, client){
        const users = client.db(dbName).collection("users");
        res.send(users);
        client.close();
    });
});

app.post("/api/users", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    var userName = req.body.name;
    var userAge = req.body.age;
    var user = {name: userName, age: userAge};

    mongoClient.connect(dbUrl, function(err, client){
        client.db(dbName).collection("users").insertOne(user, function(err, result){

            if(err) return res.status(400).send();

            res.send(user);
            client.close();
        });
    });
});

app.listen(8080, () => console.log("Listening on port 8080!"));