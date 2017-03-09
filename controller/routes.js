var Article = require("../models/Article");

module.exports = function(app) {

    app.get("/", function(req, res) {

        res.sendFile(__dirname + "/public/index.html");

    });

    app.post("/api/saved", function(req, res){

        Article.findOneAndUpdate({title: res.title, date: res.pub_date, url: res.url}, {upsert:true}, function(err, doc) {
            
            if (err) { console.log(err); }

            else { 
                
                console.log("SAVED");
                res.send(true); }

        });

    });

    app.get("/api/saved", function(req, res){

        Article.find({}, function(err, dbArticles){
            
            if (err) {console.log(err);}
            
            else {

                res.send(dbArticles);
            
            }

        });

    });
}