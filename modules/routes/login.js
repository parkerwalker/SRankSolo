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
  user.findOne({username: req.body.userName}, function(err, user){
    if(err){
      res.sendStatus(400);
    }//end error if
    else{
      if(user !== undefined && user !== null){
        bcrypt.compare(req.body.password, user.password, function(err, isMatch){
          if(err){
            res.sendStatus(400);
          }//end err if
          else{
            if (isMatch){
              res.send('match');
            }
            else{
              res.send('10')
            }
          }
        });//end compare
      }//end if userdefined
      else{
        res.send('400');
      }//end no user found
    }//end else user found
  });//end found one
});//end router use

module.exports = router;
