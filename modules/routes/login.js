var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require( 'path' );
var user = require('../user');
var bcrypt = require('bcrypt');
//console.log(user);

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/', function(req, res){
  console.log('login post hit', req.body);
  user.findOne({username: req.body.userName}, function(err, user){
    if(err){
      console.log('find user err', err);
      res.sendStatus(400);
    }//end error if
    else{
      if(user !== undefined){
        console.log('comparing', req.body.password, user.password);
        bcrypt.compare(req.body.password, user.password, function(err, isMatch){
          if(err){
            console.log('compare err', err);
            res.sendStatus(400);
          }//end err if
          else{
            console.log('user found');
            if (isMatch){
              res.send('match');
            }
            else{
              res.send('pass not match')
            }
          }
        });//end compare
      }//end if userdefined
      else{
        console.log('no user found');
        res.sendStatus(400);
      }//end no user found
    }//end else user found
  });//end found one
});//end router use

module.exports = router;
