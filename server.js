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

app.post('/add', (req, res) => {
    const userId= req.body.userId;
    const description = req.body.description;
    const duration = req.body.duration;
    let date = validateDate(req.body.date);
    if (date instanceof Error) {res.json({error: date.message})}
    let exercise = new Exercise(description, duration, date);
    databaseService.insertExercise(userId, exercise)
        .then((result) => {
            res.json({data: result});
        }).catch((err) => {
            res.json({error: err});
        });
});

// listen for requests //process.env.PORT
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });

  function validateDate (date) {
      const dateFormatCharacterLimit = 10; // yyyy-mm-dd
      let validDate = new Error("Error validating date. Please format your date as a yyyy-mm-dd string."); //default error. 
      if (typeof(date) === "undefined" || date.length < 1) { //if date is undefined or empty
        // Create a new valid date
        let d = new Date();
        let year = d.getUTCFullYear().toString();
        let month = (d.getUTCMonth() + 1).toString(); // plus one because month of January is 0. We want it to be 1.
        if (month.length < 2) {month = "0" + month} // adds the 0 to the beginning month string.
        let date = d.getUTCDate().toString();
        if (date.length < 2) {date = "0" + date} // adds the 0 to the beginning of the date string
        validDate = year + "-" + month + "-" + date; //yyyy-mm-dd
      } else if (date.length === dateFormatCharacterLimit) {
          /* if the date has the right number of characters, check if it's actually a date.
          * If its not then do nothing and let the function throw an error.
          */ 
         let d = new Date(date); 
         if (d != "Invalid Date") {validDate = date} // if the date is not invalid, then it's valid! 
      }
      return validDate;
  }