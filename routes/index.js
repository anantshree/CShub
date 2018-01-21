var express = require('express');
var router = express.Router();
var assert = require('assert');
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient;



MongoClient.connect('mongodb://localhost:27017/cshub',function(err,db){

    assert.equal(null,err);
    console.log("Successfully connected to mongodb");
    
    router.get('/internship', function(req, res, next){
        
        db.collection('internship').find({},{'_id':0}).toArray(function(err, result){
            res.json(result);
        });
        
    });

    router.get('/onlinecourses', function(req, res, next){
      db.collection('onlinecourses').find({},{'_id':0}).toArray(function(err, result){
        res.json(result);
      });
    });

    router.get('/skillarena', function(req, res, next){
      db.collection('question').find({},{'_id':0}).sort({_id:-1}).toArray(function(err, result){
        res.json(result);
      });
    });  

    router.get('/skillarenaeasy', function(req, res, next){
      db.collection('questioneasy').find({},{'_id':0}).sort({_id:-1}).toArray(function(err, result){
        res.json(result);
      });
    });  

    router.get('/technewsjobs', function(req, res, next){
      db.collection('technewsjobs').find({},{'_id':0}).toArray(function(err, result){
        res.json(result);
      });
    });

    router.get('/technewscomputers', function(req, res, next){
      db.collection('technewscomputers').find({},{'_id':0}).toArray(function(err, result){
        res.json(result);
      });
    });

    router.get('/technewsitservices', function(req, res, next){
      db.collection('technewsitservices').find({},{'_id':0}).toArray(function(err, result){
        res.json(result);
      });
    });
   
});


/*router.post('/user', function(req,res,next){
   console.log('user');
   console.log(req.body.name);
   console.log(req.body.roll);
   res.writeHead(302, {
      'Location': 'http://localhost:3000/index.html'
      //add other headers here...
    });
res.end();
});*/
module.exports = router;