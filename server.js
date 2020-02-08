require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Exercise = require('./classes/Exercise').Exercise;
const User = require('./classes/User').User;

let myExercise = new Exercise("my description", 10, "2020-02-08"); // test exercise; 
let myUser = new User("Johnny", [myExercise]);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({data: myUser});
});

app.post('/new-user', (req, res) => {
    let username = req.body.username; 
    res.json({data: username});
});

// listen for requests //process.env.PORT
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });