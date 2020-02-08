require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Exercise = require('./classes/Exercise').Exercise;
const User = require('./classes/User').User;

let myExercise = new Exercise("my description", 10, "2020-02-08"); // test exercise; 
let myUser = new User("Johnny", [myExercise]);

app.get('/', (req, res) => {
    res.json({data: myUser});
});

// listen for requests //process.env.PORT
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });