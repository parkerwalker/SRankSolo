var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require( 'path' );
var user = require('../user');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/', function(req, res){
  console.log('hit to login');

  bcrypt.genSalt(12, function(err, salt){
    if(err){
      console.log('salt err', err);
      res.sendStatus(400);
    }//end error if
    else{
      console.log('salt:', salt);
      bcrypt.hash(req.body.password, salt, function(err, hash){
        if(err){
          console.log('hash err', err);
          res.sendStatus(400);
        }//end hash error
        else{
          console.log('hash', hash);
          var newUser = {
            userName: req.body.userName,
            password: hash
          }//end newUser
          console.log('newUser', newUser);
          user(newUser).save();
          res.sendStatus(201);
        }//end else
      });//end hash
    };//end gensalt else

  });//end genSalt
});//end login hit

module.exports = router;
