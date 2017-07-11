var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./modules/routes/index');
var login = require('./modules/routes/login');
var register = require('./modules/routes/register');
var notes = require('./modules/routes/notes');

app.use(express.static('public'));
app.use(bodyParser.urlencoded( { extended: true } ) );
app.use(bodyParser.json());

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/notes', notes)



var port = process.env.PORT || 3000;

app.listen( port, function(){
  console.log('server up on:', port);
})//end listen
