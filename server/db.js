const { MongoClient, ServerApiVersion } = require("mongodb");

// Mongo
const mongoUser = encodeURIComponent(process.env.MONGO_USERNAME || 'user');
const mongoPass = encodeURIComponent(process.env.MONGO_PASSWORD || '1234');
const uri = `mongodb+srv://${mongoUser}:${mongoPass}@phase2-data.deeexoe.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "react-app";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// const db = client.db(dbName);

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db(dbName).command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
module.exports = {client: client, db: client.db(dbName)}