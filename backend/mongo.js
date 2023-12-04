var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";

const { MongoClient } = require("mongodb");
// Mongo
const url = "mongodb+srv://adminuser:11zofQTYB2kx8XXr@phase2-data.deeexoe.mongodb.net/";
const dbName = "react-app";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/listPhones", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {productType: "Phone"};
    const results = await db
    .collection("products")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/listWatches", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {productType: "Watch"};
    const results = await db
    .collection("products")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});