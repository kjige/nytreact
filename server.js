var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require('method-override');

var Article = require("./models/Article.js");

mongoose.Promise = Promise;

var app = express();
const PORT = process.env.PORT || 3000;
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(methodOverride('_method'));

app.use(express.static("./public"));

mongoose.connect("mongodb://heroku_cq7kfnzz:884t9f3iv0qaf6i41t0vst2pqn@ds127260.mlab.com:27260/heroku_cq7kfnzz", function (err) {
    
    if (err) { console.log("Connection Failed!", err); } 
    
    else {
        console.log("Connection Successful!");
        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'DB connection error:'));
        db.once('open', function () {
            console.log("DB connected.");
        });
        init();
    }
});

function init() {

    app.listen(PORT, function() { 
        console.log("App listening on PORT: " + PORT); 
    });

    require('./controller/routes.js')(app);
}