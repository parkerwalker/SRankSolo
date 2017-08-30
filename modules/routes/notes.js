var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require( 'path' );
var notesModel = require('../notesSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/', function(req, res){

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

  var foundNotes = [];

  notesModel.find({createdBy: req.body.createdBy, lane: req.body.lane}, function(err, notesModel){
    if(err){
      res.sendStatus(400);
    }else{
      for (var i = 0; i < notesModel.length; i++) {
        for (var j = 0; j < notesModel[i].players.length; j++) {
          if (notesModel[i].players[j].champion == req.body.champs[0]) {
            for (var k = 0; k < notesModel[i].players.length; k++){
              if (notesModel[i].players[k].champion == req.body.champs[1]) {
                console.log(notesModel[i].notes);
                foundNotes.push(notesModel[i].notes)
              }//end second champ if
            }//end second param loop
          }//end if first champ match
        }//end notesModel player loop

      }//end notesModel loop
      res.send(foundNotes)
    }//end else

  });//end find function
});//end note search


module.exports = router;
