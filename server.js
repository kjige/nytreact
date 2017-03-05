var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Article = require("./models/Article.js");
mongoose.Promise = Promise;
var app = express();
const PORT = 3000;
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

mongoose.connect("mongodb://localhost/nytreact", function (err) {
    if (err) { console.log("Connection Failed!", err); } 
    else {
        console.log("Connection Successful!");
        db = mongoose.connection;
        init();
    }
});

function init() {

    app.listen(PORT, function() { console.log("App listening on PORT: " + PORT); });

    require('./controller/routes.js')(app);
}