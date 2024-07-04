var express = require('express');
var router = express.Router();

var { client, db } = require('../db')

router.put("/addReview/:productId/:userId/", async (req, res) => {
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

router.delete("/deleteReview/:productId/:userId/", async (req, res) => {
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

module.exports = router;
