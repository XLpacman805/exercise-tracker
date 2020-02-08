require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
    res.json({data: "Hello World!"});
});

// listen for requests //process.env.PORT
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });