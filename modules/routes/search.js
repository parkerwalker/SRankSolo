var express = require('express');
var router = express.Router();
var path = require( 'path' );
var request = require('request');


router.post('/currentGame', function(req, res){
  console.log(req.body);
  request('https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/' + req.body.id + '?api_key=' + process.env.RIOT_API, function(error, response, body){
    console.log(body);
    res.send(body);
  });//end request
});// end currentGame

router.post('/searchMastery', function(req, res){
  console.log('searchMaster hit', req.body);
  request('https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/' + req.body.id + '?api_key=' + process.env.RIOT_API, function(error, response, body){
    console.log(body);
    res.send(body)
  });//end request
});//end searchMatch

router.post('/searchSummoner', function(req, res){
  console.log(req.body);
  request('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + req.body.summoner + '?api_key=' + process.env.RIOT_API, function(error, response, body){
    console.log(body);
    res.send(body)
  });//end request
});//end post

router.post('/searchMatch', function(req, res){
  console.log(req.body);
  request('https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + req.body.id + '/recent?api_key=' + process.env.RIOT_API, function(error, response, body){
    console.log(body);
    res.send(body)
  });//end request
});//end searchMatch

router.post('/specificMatch', function(req, res){
  console.log(req.body);
  request('https://na1.api.riotgames.com/lol/match/v3/matches/' + req.body.id + '?api_key=' + process.env.RIOT_API, function(error, response, body){
    console.log(body);
    res.send(body);
  });//end specificMatch

});

module.exports = router;
