var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());

const HOST = "localhost";
const PORT = 8081;
const TOKEN_KEY = "1234567890";

app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static("images"));

// Mongo
const url = "mongodb+srv://adminuser:11zofQTYB2kx8XXr@phase2-data.deeexoe.mongodb.net/";
const dbName = "react-app";
const client = new MongoClient(url);
const db = client.db(dbName);

// Authentication
// Credit: https://hackernoon.com/how-to-add-authentication-to-a-full-stack-mern-web-application
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const token = String(req.headers.authorization)
        .replace(/^bearer|^jwt/i, "")
        .replace(/^\s+|\s+$/gi, "");

    try {
        if (!token) {
            return res.status(403).json({
                statusCode: 403,
                msg: "A token is required for authentication",
            });
        }
        /* Verifying the token. */
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.userData = decoded;
    } catch (err) {
        return res.status(401).json({
            statusCode: 401,
            msg: "Invalid Token",
        });
    }
    return next();
};

app.listen(PORT, () => {
    console.log("App listening at http://%s:%d", HOST, PORT);
});

app.get("/listPhones", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to List Phones MongoDB");
    const query = { productType: "Phone" };
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
    console.log("Node connected successfully to List Watches MongoDB");
    const query = { productType: "Watch" };
    const results = await db
        .collection("products")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.post("/login", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to Login MongoDB");
    const query = { email: req.body.email, password: req.body.password };
    const results = await db
        .collection("users")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    if (results.length !== 0) {
        /* Creating a token. */
        const token = jwt.sign({email: query.email}, TOKEN_KEY, {
            expiresIn: "2h",
        });
        console.log(token);
        return res.status(200).json({
            statusCode: 200,
            msg: "Login successful",
            token: token
        });
    }
    return res.status(401).json({
        statusCode: 401,
        msg: "Invalid login information!"
    });
});