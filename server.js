require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Exercise = require('./classes/Exercise').Exercise;
const User = require('./classes/User').User;
const databaseService = require('./database.service');

let myExercise = new Exercise("my description", 10, "2020-02-08"); // test exercise; 
let myUser = new User("Johnny", [myExercise]);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({data: myUser});
});

// Responsible for inerting a new user into the database. 
app.post('/new-user', (req, res) => {
    const username = req.body.username;
    // Create a new user with the given username.
    if (typeof(username) === "string" && username.length > 0) {
        let user = new User(username, []);
        //Insert user into the database.
        databaseService.insertUser(user)
            .then((result) => {
                res.json(result);
            }).catch((err) => {
                res.json({error: err});
            });
    } else {
        res.json({error: "Error with checking data type of username. Ensure that you are passing a string."});
    }
});

// listen for requests //process.env.PORT
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });