/*const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

var app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require("./routes/index"));
//app.use(require("./routes/users"));

app.listen(3000, function () {
  console.log("Server is running.. on Port 3000");
});

*/
// load the things we need
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const path = require("path");

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use res.render to load up an ejs view file
const routes = require("./routes/index");
app.use(express.static("public"));

app.use(require("./routes/index"));

app.listen(3002);
console.log("3002 is the magic port");
