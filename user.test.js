const User = require("./classes/User").User;

let userName = "HAMMMY";
let logs = [];

let myUser = new User(userName, logs);

console.log(myUser);