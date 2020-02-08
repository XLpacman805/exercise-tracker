require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@url-shortener-h3i7u.mongodb.net/test`;
const dbName = "development";
const collectionName = "exercise-tracker";

function test () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(MONGODB_URI, (err, client) => {
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