var express = require('express');
var router = express.Router();
var assert = require('assert');
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient;



MongoClient.connect('mongodb://localhost:27017/cshub',function(err,db){

    assert.equal(null,err);
    console.log("Successfully connected to mongodb");
    var id = 1;

    router.post('/client', function(req, res, next){
    	var btntype = req.body.btntype
    	var name = req.body.name;
    	var username = req.body.username;
    	var mobile = req.body.mobile;
    	var email = req.body.email;
    	var password = req.body.password;
    	var confirmpassword = req.body.confirmpassword;

    	if(btntype == 'signup'){
    		if(name == '' || username == '' || mobile == '' || email == '' || password == '' || 
    			confirmpassword == ''){
    			res.send('Kindly, fill all the fields');
    		}
    		else{
    			if(password != confirmpassword){
    				res.writeHead(302, {
						'Location': 'http://localhost:3000/Userpage.html'
						    //add other headers here...
					});
					res.end();
    			}
    			else{
    				if(mobile.length != 10){
    					res.writeHead(302, {
					      'Location': 'http://localhost:3000/Userpage.html'
					      //add other headers here...
					    });
						res.end();
    				}
    				else{
                        sess = req.session;
    					db.collection('users').insert({'name':name, 'username':username, 'mobile':mobile,
    				    'email':email, 'password':password, 'confirmpassword': confirmpassword });
                        sess.username = username;
    				    res.writeHead(302, {
					      'Location': 'http://localhost:3000/main.html'
					      //add other headers here...
					    });
						res.end();
    				}
    			}
    		}
    	}

    	if (btntype == 'signin') {
    		if (username == '' || password == '') {
    			res.send("Kindly, fill all the fields");
    		}
    		else{
    			sess = req.session;
    			db.collection('users').find({'username':username,'password':password})
    			.toArray(function(err, result){
    				if(result.length == 0){
    					res.writeHead(302, {
					      'Location': 'http://localhost:3000/Userpage.html'
					      //add other headers here...
					    });
						res.end();
    				}
    				else{
    					result.forEach(function(data){
    						sess.username = data.username;
    						console.log(sess.username);
    						res.writeHead(302, {
						      'Location': 'http://localhost:3000/main.html'
						      //add other headers here...
						    });
							res.end();
    					});
    				}
    			});
    		}
    	}
    });

    router.get('/main', function(req, res, next){
       sess = req.session;
       if(sess.username){
        res.json({'username' : sess.username});
       }
       else{
        res.json({'username' : 'empty'});
       }
       
    });

    router.get('/mainlogout', function(req, res, next){
       req.session.destroy();
        res.json({'username' : 'empty'});
    });

    router.post('/forum', function(req, res, next){
          var question = req.body.question;
          var name = req.body.name;
    

         db.collection('counters').update({_id:'questionid'},{$inc:{sequence_value:1}});
         db.collection('counters').find().toArray(function(err, result){
            db.collection('questions').insert({
                "_id":result[0].sequence_value,
                "name":name,
                "question_name":question
            });
         });

         res.writeHead(302, {
            'Location': 'http://localhost:3000/forumquestions.html'
             //add other headers here...
         });
         res.end();
    
    });    

    router.get('/forumquestion', function(req, res, next){
       db.collection('questions').find().sort({'_id':-1}).toArray(function(err, result){
            res.json(result);
       });
    });

    router.get('/forum_comment', function(req, res, next){
        var questid = req.query.id;
        var cursor = db.collection('questions').find()
        cursor.forEach(function(doc){
            if(doc._id == questid){
                db.collection('temp').insert(doc);
                return
            }
        });
        res.writeHead(302, {
            'Location': 'http://localhost:3000/forum_comment.html'
             //add other headers here...
         });
         res.end();
       
    });

    router.get('/forumanswers', function(req, res, next){
        var result = [];
        db.collection('temp').find().toArray(function(err, result){
            if(result.length != 0){
                 id = result[0]._id;
                 db.collection('questions').find({'_id':id}).toArray(function(err, result){
                    res.json(result);
                 }); 
                 db.collection('temp').drop();
            }
            else{
               db.collection('questions').find({'_id':id}).toArray(function(err, result){
                    res.json(result);
               });  
            }
        });

    });

    router.post('/forumanswers', function(req, res, next){
        var qname = req.body.qname;
        var name = req.body.name;
        var answer = req.body.answer;
        console.log(qname);
        console.log(answer);
        db.collection('questions').update(
           { name : qname },
           {
             $push: {
               answers: {
                  $each: [ { name: name, answer: answer }]
               }
             }
           }
        )

        res.writeHead(302, {
            'Location': 'http://localhost:3000/forum_comment.html'
             //add other headers here...
         });
         res.end();
    });

    router.get('/loginForum', function(req, res, next){
        sess = req.session;
           if(sess.username){
            res.json({'username' : sess.username});
           }
           else{
            res.json({'username' : 'empty'});
           }
    });



});    

module.exports = router;