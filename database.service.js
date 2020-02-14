require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@url-shortener-h3i7u.mongodb.net/test`;
const dbName = "development";
const collectionName = "exercise-tracker";

/**
 * Responsible for connecting to the mongo database and inserting a User into a collection.
 * @param {User} user - An instance of the User class. 
 * @returns {Promise} - Resolves to an object containing the inserted document with it's _id. 
 */
exports.insertUser = function (user) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true }, (err, client) => {
            if (err) reject(err);
            const collection = client.db(dbName).collection(collectionName);
            // write the code to insert. 
            collection.insertOne(user, (err, result) => {
                if (err) reject(err);
                resolve(result.ops[0]);
                client.close();
            });
        });
    });
}

/**
 * Responsible for connecting to the mongo database and inserting an Exercise into a user's log. 
 * @param {String} userId - The mongoDB _id string. 
 * @param {Exercise} exercise - An instance of the exercise class. 
 * @returns {Promise} - Resolves to an object with the up to date User.
 */
exports.insertExercise = function (userId, exercise) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true }, (err, client) => {
            if (err) reject(err);
            const collection = client.db(dbName).collection(collectionName);
            let query = { _id: new ObjectID(userId) } // the ID cannot be a string. Must be the Mongo ObjectID. 
            // find user in collection. 
            collection.updateOne(query, {
                $push: { logs: exercise } //pushes the exercise to the logs array.
            }, (err) => {
                if (err) reject(err);
                collection.findOne(query, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                    client.close;
                })
            });
        });
    });
}

/**
 * Responsible for getting all the usernames & ids in the database.
 * @returns {Promise} - resolves to a cursor array with all the usernames and ids. 
 */
exports.getUsers = function () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(MONGODB_URI, {useUnifiedTopology: true}, (err, client) => {
            if (err) reject(err);
            const collection = client.db(dbName).collection(collectionName);
            let query = {}
            let projectionOptions = {_id:1, username: 1} //grab _id and useraname fields. 
            collection.find(query, {projection: projectionOptions}, (err, cursor) => {
                if (err) reject(err);
                resolve(cursor.toArray());
            });            
        });
    });
}

exports.getLog = function (userId, fields) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(MONGODB_URI, {useUnifiedTopology: true}, (err, client) => {
            if (err) reject(err);
            const collection = client.db(dbName).collection(collectionName);
            let query = { _id: new ObjectID(userId) }
            collection.findOne(query, (err, result) => {
                if (err) reject (err);
                resolve(result);
            });
            
        });
    });
}