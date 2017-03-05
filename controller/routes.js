var Article = require("../models/Article");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.sendFile(__dirname + "/public/index.html");
    });

    app.post("/saveThisArticle", function(req, res){

        Article.findOneAndUpdate({title: results.title, date: date, url: url}, {upsert:true}, function(err, doc) {
            
            if (err) { console.log(err); }
            
        });

    });

    app.get("/getSavedArticles", function(req, res){

        Article.find({}, function(err, dbArticles){
        
            this.setState({savedArticles: dbArticles});

            console.log(dbArticles);

        });

    });
}