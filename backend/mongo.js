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
const mongoPass = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const url = `mongodb+srv://adminuser:${password}@phase2-data.deeexoe.mongodb.net/`;
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

app.get("/listLaptops", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to List Laptops MongoDB");
    const query = { productType: "Laptop" };
    const results = await db
        .collection("products")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/listTablets", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to List Tablets MongoDB");
    const query = { productType: "Tablet" };
    const results = await db
        .collection("products")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/listVrs", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to List Vrs MongoDB");
    const query = { productType: "VR" };
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
        const newIdObject = await db
            .collection("users")
            .find()
            .sort({id:-1})
            .limit(1)
            .toArray();
        console.log(newIdObject);
        const newId = `${parseInt(newIdObject[0].id) + 1}`;

        const createAccountResults = await db
            .collection("users")
            .insertOne({
                id: newId,
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                location: req.body.location,
                image: req.body.image,
                title: req.body.title,
                phone: req.body.phone,
                wishlist: [`${getRandomInt(20)+1}`, `${getRandomInt(20)+1}`, `${getRandomInt(20)+1}`],
                cart: [`${getRandomInt(20)+1}`, `${getRandomInt(20)+1}`, `${getRandomInt(20)+1}`],
                recentlyPurchased: [`${getRandomInt(20)+1}`, `${getRandomInt(20)+1}`, `${getRandomInt(20)+1}`]
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

app.get("/getUserById/:id", async (req, res) => {
    const id = Number(req.params.id);
    console.log("User to find:", id);

    await client.connect();
    console.log("Node connected successfully to Get User By ID MongoDB");
    const query = { id: `${id}` };
    const results = await db
        .collection("users")
        .find(query)
        .limit(1)
        .toArray();
    console.log(results);
    if (!results || results.length === 0) {
        return res.status(404).json({
            statusCode: 404,
            msg: `Could not find user with id ${id}!`
        });
    }
    res.status(200);
    res.send(results[0]);
});

app.put("/addReview/:productId/:userId/", async (req, res) => {
    const productId = Number(req.params.productId);
    const userId = Number(req.params.userId);

    await client.connect();
    console.log("Node connected successfully to Add Review By User ID MongoDB");
    console.log(`Adding review for product ${productId} for user ${userId} with body:`, req.body);

    const oldQuery =  {$and: [{productId: `${productId}`}, {reviews: {$elemMatch: {userId: userId}}}]};
    const deleteQuery = { $pull: { "reviews": { userId : userId } }};
    const oldResults = await db
        .collection("products")
        .updateMany(
            oldQuery,
            deleteQuery
        );
        
    const query =  {productId: `${productId}`};
    const insert = { $push: { "reviews": { userId : userId, title: req.body.title, text: req.body.text, "rating": req.body.rating } } };
    const results = await db
        .collection("products")
        .updateOne(
            query,
            insert
        );
    console.log(results);
    res.status(200);
    res.send(results);
});

app.delete("/deleteReview/:productId/:userId/", async (req, res) => {
    const productId = Number(req.params.productId);
    const userId = Number(req.params.userId);

    await client.connect();
    console.log("Node connected successfully to Delete Review By User ID MongoDB");
    console.log(`Adding review for product ${productId} for user ${userId}`);
    const query =  {$and: [{productId: `${productId}`}, {reviews: {$elemMatch: {userId: userId}}}]};
    const deleteQuery = { $pull: { "reviews": { userId : userId } }};
    const results = await db
        .collection("products")
        .updateMany(
            query,
            deleteQuery
        );
    console.log(results);
    res.status(200);
    res.send(results);
});