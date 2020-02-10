require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@url-shortener-h3i7u.mongodb.net/test`;
const dbName = "development";
const collectionName = "exercise-tracker";

function test () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true }, (err, client) => {
            if (err) throw err; 
            const collection = client.db(dbName).collection(collectionName);
            query = {}; //empty to get all
            collection.find(query, (err, cursor) =>{
                if (err) reject (err);
                resolve (cursor);
            });
        });
    });
}

test()
    .then((cursor) =>{
        cursor.forEach((document) => {
            console.log(document);
        });
    }).catch((err) => {
        console.log(err);
    });

    exports.insertUser = function(user) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true }, (err, client) => {
                if (err) reject (err);
                const collection = client.db(dbName).collection(collectionName);
                // write the code to insert. 
                collection.insertOne(user, (err, result) => {
                    if (err) reject (err);
                    resolve (result.ops[0]);
                    client.close();
                });
            });
        });
    }

    exports.insertExercise = function(userId, exercise) {
        return new Promise ((resolve, reject) => {
            MongoClient.connect(MONGODB_URI, {useUnifiedTopology: true}, (err, client)  => {
                if (err) reject (err);
                const collection = client.db(dbName).collection(collectionName);
                let query = {_id : new ObjectID(userId)} // the ID cannot be a string. Must be the Mongo ObjectID. 
                // find user in collection. 
                collection.findOne(query, (err, result) => {
                    if (err) reject (err);
                    resolve(result);
                });
                //insert Exercise into it's logs.
            });
        });
    }