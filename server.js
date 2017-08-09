require('dotenv').config({path: './config.env'});
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./modules/routes/index');
var search = require('./modules/routes/search');
var login = require('./modules/routes/login');
var register = require('./modules/routes/register');
var notes = require('./modules/routes/notes');

app.use(express.static('public'));
app.use(bodyParser.urlencoded( { extended: true } ) );
app.use(bodyParser.json());

app.use('/', index);
app.use('/search', search);
app.use('/login', login);
app.use('/register', register);
app.use('/notes', notes);

var port = process.env.PORT || 3050;

app.listen( port, function(){
  console.log('server up on:', port);
});//end listen

app.get('/api', function(req, res){
  console.log(process.env.RIOT_API);
  res.send(process.env.RIOT_API);
});//end get api
