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

router.post('/search', function(req, res){
  console.log('get notes hit', req.body);

  notesModel.find({createdBy: req.body.createdBy, lane: req.body.lane}, function(err, notesModel){
    if(err){
      console.log('no notes found');
      res.sendStatus(400);
    }else{
      console.log('found notes!');
      console.log(notesModel);
      for (var i = 0; i < notesModel.length; i++) {
        for (var j = 0; j < notesModel[i].players.length; j++) {
          console.log(notesModel[i].players[j].champion);
          if (notesModel[i].players[j].champion == req.body.champs[0]) {
            for (var l = 0; l < notesModel[i].players.length; l++){
              if (notesModel[i].players[l].champion == req.body.champs[1]) {
                console.log(notesModel[i].notes);
              }
            }
          }
        }//end notesModel player loop

      }//end notesModel loop
    }//end else

  });//end find function
});//end note search


module.exports = router;
