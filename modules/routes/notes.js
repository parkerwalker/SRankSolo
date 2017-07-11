var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require( 'path' );
var notesModel = require('../notesSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/', function(req, res){
  console.log('notes hit', req.body);

  var newNotes = {
    notes: req.body.notes,
    players: req.body.players,
    lane: req.body.lane,
    createdBy: req.body.createdBy
  }

  notesModel(newNotes).save();
  res.sendStatus(201);
});//end post


module.exports = router;
