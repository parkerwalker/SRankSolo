var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./modules/routes/index');
var register = require('./modules/routes/register');

app.use(express.static('public'));
app.use(bodyParser.urlencoded( { extended: true } ) );
app.use(bodyParser.json());

app.use('/', index);
app.use('/register', register);



var port = process.env.PORT || 3000;

app.listen( port, function(){
  console.log('server up on:', port);
})//end listen
