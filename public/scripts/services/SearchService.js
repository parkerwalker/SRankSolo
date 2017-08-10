app.service('SearchService', function($http){
  console.log('searchservice');
  
  var key;
 $http.get('/api').then( function(res){
    key = res.data;
  });//end api key call

  ss = this;

  ss.currentGame = function(summonerId){
    return $http.post('/search/currentGame', summonerId).then(function(response){
      return response.data;
    }, function(err){
      console.log(err);
      return err;
    });//end http
  };//end ss.currentGame

  ss.searchSummoner = function(summoner){
    return $http.post('/search/searchSummoner', summoner).then(function(response){
      return response.data;
    }, function(err){
      return err;
    });//end searchUrl
  };//end searchGif

  ss.searchSummonerMastery = function(summonerId){
    objectToSend = {
      id: summonerId,
    }
    return $http.post('/search/searchMastery', objectToSend).then(function(response){
      console.log(response.data);
      return response.data;
    });//end http
  };//end searchSummonerMastery

  ss.searchMatch = function(account){
    return $http.post('/search/searchMatch', account).then(function(response){
      console.log(response);
      return response.data
    });//end http
  };//end searchMatch

  ss.specificMatch = function(matchId){
    return $http.post('/search/specificMatch', matchId).then(function(response){
      console.log(response);
      return response.data;
    });//end http
  };//end specificMatch

});//end SearchService
