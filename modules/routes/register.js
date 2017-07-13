var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require( 'path' );
var user = require('../user');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/', function(req, res){
  console.log('hit to register');

  bcrypt.genSalt(12, function(err, salt){
    user.findOne({username: req.body.userName}, function(err, summoner){
      if(err){
        console.log('check user err', err);
        res.sendStatus(400);
      }//end error if
      else {
        if(summoner){
          console.log('already user', user);
          res.send('3');
        }
        else {
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
                  username: req.body.userName,
                  password: hash
                }//end newUser
                console.log('newUser', newUser);
                user(newUser).save();
                res.sendStatus(201);
              }//end else
            });//end hash
          };//end gensalt else

        }//end if no err
      }//end err if/else
    });//end findOne

  });//end genSalt
});//end login hit

module.exports = router;
