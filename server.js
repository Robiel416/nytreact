var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var Article = require("./models/Article.js");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});


 app.get("/api/saved", function(req, res) {
     Article.find({}).exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
     });
 });


 app.post("/api/saved", function(req, res) {
   
      var article = {};

    
      article.title = req.body.headline.main;
      article.date = req.body.pub_date;
      article.url = req.body.web_url


    Article.update({
        title: req.body.headline.main
    }, article, { upsert: true, setDefaultOnInsert: true }, function(err) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        else {
          Article.findOne({title: req.body.headline.main}, function(err, doc) {
          console.log(doc)
            if (err) {
              console.log(err);
              res.status(500).send(err);
            } else {
               res.send(doc);
            }
          })
        }
    });
 });


 app.delete("/api/saved/:id", function(req, res) {
    Article.findOneAndRemove({"_id": req.params.id}, function(err, doc) {
        console.log("deleted")
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
            res.send(doc);
        }
    })

 });


app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});