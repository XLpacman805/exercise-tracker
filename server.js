require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Exercise = require('./classes/Exercise').Exercise;
const User = require('./classes/User').User;
const databaseService = require('./database.service');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({data: "Hello world"});
});

// Responsible for inserting a new user into the database. 
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

// Responsible for inserting exercises into a user's log.
app.post('/add', (req, res) => {
    const userId= req.body.userId;
    const description = req.body.description;
    let duration = req.body.duration;
    let date = validateDate(req.body.date);
    if (date instanceof Error) {res.json({error: date.message})}
    let exercise; // defined outside of try because closure!
    try {exercise = new Exercise(description, duration, date)} catch(err) {res.json({error:err.message})} //error handling. 
    databaseService.insertExercise(userId, exercise)
        .then((result) => {
            res.json({data: result});
        }).catch((err) => {
            res.json({error: err});
        });
});

// Responsible for getting all users with their id and username.
app.get('/users', (req, res) => {
    databaseService.getUsers()
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
            res.json({error: err});
        });
});

// Responsible for getting the exercise log for the given user and options
app.get('/log', (req, res) => {
    const userId = req.params.userId;
    const fromDate = req.params.from;
    const toDate = req.params.to;
    const limit = req.params.limit; 
    
    res.json({data: "Hello World"});
});

// listen for requests
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });

/**
 * Responsible for returning an error or properly formatted date.
 * @param {String} date - A date string formatted as yyyy-mm-dd.
 * @returns {Date} - A retuns a Date object in UTC timezone.  
 */
function validateDate (date) {
      const dateFormatCharacterLimit = 10; // yyyy-mm-dd
      let validDate = new Error("Error validating date. Please format your date as a yyyy-mm-dd string."); //default error. 
      if (typeof(date) === "undefined" || date.length < 1) { //if date is undefined or empty
        // Create a new valid date
        validDate = new Date();
      } else if (date.length === dateFormatCharacterLimit) {
          /* if the date has the right number of characters, check if it's actually a date.
          * If its not then do nothing and let the function throw an error.
          */ 
         let d = new Date(date); 
         if (d != "Invalid Date") {validDate = d} // if the date is not invalid, then it's valid! 
      }
      return new Date(validDate.toUTCString()); // Converts to UTC Date.
  }