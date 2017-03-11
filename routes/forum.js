var express = require('express');
var router = express.Router();

var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
    var data = "";

        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        var url = process.env.SEDDB;
        var posts = "";
        MongoClient.connect(url, function (err, db) {
          if (err) {
            res.send('Unable to connect to the mongoDB server. Error:', err);
          } else {

            var collection = db.collection('forum');

          collection.find().toArray(function (err, result) {
              console.log(result);
              if(req.session.auth!= null && req.session.auth=="yes"){
              res.render("forum",
                  {
                      user:req.session.user,
                      posts: result,
                      auth:"yes"
                  }
              );
          }else{
              res.render("forum",
                  {
                      user:"",
                      posts: result,
                      auth:"no"
                  }
              );
          }
          db.close();
        });

          }
        });

});
router.get('/:id', function(req, res){
    console.log(req.params.id);
    var search = req.params.id;
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;
    var url = process.env.SEDDB;
    var cur_view = 0;
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.send('Unable to connect to the mongoDB server. Error:', err);
        } else {
            var collection = db.collection('forum');
            collection.find({
                    url: search
            }).toArray(function(err, result) {
                if(result.length){
                    console.log(result[0].views);
                    var temp = result[0].views+1;
                    collection.update({url:search},{$set: {views: temp}});
                    res.render("post", {
                        post:result
                    });
                }

                });

            }

        });
});

router.post('/', function(req, res){
    console.log('post');
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;

    // Connection URL. This is where your mongodb server is running.
    var url = process.env.SEDDB;
    var title = req.body.title;
    var desc = req.body.description;
    var link = req.body.link;
    var user = req.session.user;
    var views = 0;

    MongoClient.connect(url, function(err, db) {

        if (err) {
            res.send('Unable to connect to the mongoDB server. Error:', err);
        } else {
            var collection = db.collection('forum');
            var id = 0;
            var temp = user+" "+title;
            var url = temp.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            var idea = {
                    title: title,
                    description: desc,
                    link: link,
                    author: user,
                    views: views,
                    url: url
                };
                    collection.insert([idea], function(err, result) {
                            if (err) {
                                res.send(err);
                            }   else {
                                res.redirect("forum");


                            }
                    });


            }

        });

});
module.exports = router;
