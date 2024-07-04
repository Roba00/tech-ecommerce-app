var express = require('express');
var router = express.Router();

var { client, db } = require('../db')

router.get("/getProductById/:id", async (req, res) => {
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

router.get("/listPhones", async (req, res) => {
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

router.get("/listWatches", async (req, res) => {
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

router.get("/listLaptops", async (req, res) => {
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

router.get("/listTablets", async (req, res) => {
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

router.get("/listVrs", async (req, res) => {
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

module.exports = router;
