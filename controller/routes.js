var Article = require("../models/Article");
var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res) {

        res.sendFile(__dirname + "/public/index.html");

    });

    app.post("/api/saved", function(req, res){

        var art = req.body;
        
        Article.create({title: art.title, date: art.date, url: art.url}, function(err, doc) {
            
            if (err) { console.log(err); }

            else { 

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

    app.delete('/api/saved/:id', function(request, response) {
        
        var artId = request.params.id;
        
        Article.remove({ _id: artId }, function(error, article) {
            
            if (error) { response.send(error); } 
         
            else { response.send(article); }
        
        });
    });

    app.get("/api/resume", function(req, res){
        if (req.query.q == 'Ping'){
            res.send('OK');
        } else {
            res.send('Yes');
        }
    });

    app.get("*", function(req, res) {

        res.sendFile(path.join(__dirname, '../public', 'index.html'));

    });
}