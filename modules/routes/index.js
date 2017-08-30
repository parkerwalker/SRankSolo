var express = require('express');
var router = express.Router();
var path = require( 'path' );

router.get('/', function(req, res){
  res.sendFile(path.resolve('public/views/index.html'));
});//end base url

module.exports = router;
