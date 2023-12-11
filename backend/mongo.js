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
const jwt = require("jsonwebtoken");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

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
        const token = jwt.sign({ email: query.email }, TOKEN_KEY, {
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
        msg: "Invalid login information!",
        token: null
    });
});

app.post("/createAccount", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to Create Account MongoDB");
    const query = { email: req.body.email };
    const results = await db
        .collection("users")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    if (results.length === 0) {
        const createAccountResults = await db
            .collection("users")
            .insertOne({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                location: req.body.location,
                image: req.body.image,
                title: req.body.title,
                phone: req.body.phone,
                wishlist: [`${getRandomInt(8)+1}`, `${getRandomInt(8)+1}`, `${getRandomInt(8)+1}`],
                cart: [`${getRandomInt(8)+1}`, `${getRandomInt(8)+1}`, `${getRandomInt(8)+1}`],
                recentlyPurchased: [`${getRandomInt(8)+1}`, `${getRandomInt(8)+1}`, `${getRandomInt(8)+1}`]
            });

        /* Creating a token. */
        const token = jwt.sign({ email: req.body.email }, TOKEN_KEY, {
            expiresIn: "2h",
        });
        console.log(token);
        return res.status(200).json({
            statusCode: 200,
            msg: "Login and create account successful",
            token: token
        });
    }
    return res.status(401).json({
        statusCode: 401,
        msg: "Invalid account creation information!",
        token: null
    });
});

app.get("/getAccount", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to Get Account MongoDB");
    const token = String(req.headers.authorization);
    console.log(req.headers);
    console.log(token);
    try {
        if (!token) {
            return res.status(403).json({
                statusCode: 403,
                msg: "A token is required for authentication",
            });
        }
        /* Verifying the token. */
        const decoded = jwt.verify(token, TOKEN_KEY);
        console.log(decoded);
        req.decodedToken = decoded;
    } catch (err) {
        return res.status(401).json({
            statusCode: 401,
            msg: "Invalid Token",
        });
    }
    const query = { email: req.decodedToken.email };
    const results = await db
        .collection("users")
        .find(query)
        .limit(1)
        .toArray();
    console.log(results);
    if (results.length !== 0) {
        /* Creating a results. */
        console.log(token);
        return res.status(200).json({
            statusCode: 200,
            msg: "Login successful",
            userData: results[0]
        });
    }
    return res.status(401).json({
        statusCode: 401,
        msg: "Invalid login token information!"
    });
});

app.put("/updateAccount", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to Update Account MongoDB");
    const token = String(req.headers.authorization);
    console.log(token);
    try {
        if (!token) {
            return res.status(403).json({
                statusCode: 403,
                msg: "A token is required for authentication",
            });
        }
        /* Verifying the token. */
        const decoded = jwt.verify(token, TOKEN_KEY);
        console.log("User JWT decoded:", decoded);
        req.decodedToken = decoded;
    } catch (err) {
        return res.status(401).json({
            statusCode: 401,
            msg: "Invalid Token",
        });
    }

    console.log(req.body.email);
    delete req.body._id;
    /*console.log(values);
    const [id, name, password, location, image, wishlist, cart, recentlyPurchased, email, title, phone] = values;
    console.log("Product to update:", id);
    const replacement = {
        "id": id,
        "name": name,
        "password": password,
        "location": location,
        "image": image,
        "wishlist": wishlist,
        "cart": cart,
        "recentlyPurchased": recentlyPurchased,
        "email": email,
        "title": title,
        "phone": phone,
    };*/
    if (req.decodedToken.email === req.body.email) {
        /* Creating a results. */
        const query = { "email": req.decodedToken.email };
        const results = await db.collection("users")
            .replaceOne(query, req.body);

        if (!results) {
            return res.status(404).json({
            statusCode: 404,
            msg: "Not found."
        });
        }
        return res.status(200).json({
            statusCode: 200,
            msg: "Successfully updated user info!"
        });
    }
    return res.status(401).json({
        statusCode: 401,
        msg: "Invalid user token information!"
    });
});

app.get("/getProductById/:id", async (req, res) => {
    const id = Number(req.params.id);
    console.log("Product to find:", id);

    await client.connect();
    console.log("Node connected successfully to Get Product By ID MongoDB");
    const query = { productId: `${id}` };
    const results = await db
        .collection("products")
        .find(query)
        .limit(1)
        .toArray();
    console.log(results);
    if (!results || results.length === 0) {
        return res.status(404).json({
            statusCode: 404,
            msg: `Could not find product with id ${id}!`
        });
    }
    res.status(200);
    res.send(results[0]);
});