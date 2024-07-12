var express = require('express');
var router = express.Router();

var { client, db } = require('../db')

// Authentication
const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.JSON_WEB_TOKEN_KEY || '0123456789';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

router.get("/getUserById/:id", async (req, res) => {
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

router.post("/login", async (req, res) => {
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

router.post("/createAccount", async (req, res) => {
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

router.get("/getAccount", async (req, res) => {
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

router.put("/updateAccount", async (req, res) => {
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

module.exports = router;
