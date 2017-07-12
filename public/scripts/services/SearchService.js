app.service('SearchService', function($http){
  console.log('searchservice');
  // var key = 'RGAPI-46b2829c-e5cb-4fc4-a312-399ea6326fe2';

  ss = this;

  ss.currentGame = function(summonerId){
    ss.currentUrl = 'https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/' + summonerId + '?api_key=' + key;
    return $http.get(ss.currentUrl).then(function(response){
      return response.data;
    });//end http
  };//end ss.currentGame

  ss.searchSummoner = function(url){
    return $http.get(url).then(function(response){
      return response.data;
    });//end searchUrl
  };//end searchGif

  ss.searchSummonerMastery = function(summonerId){
    ss.masteryUrl = 'https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/' + summonerId + '?api_key=' + key;
    return $http.get(ss.masteryUrl).then(function(response){
      return response.data;
    });//end http
  };//end searchSummonerMastery

  ss.searchMatch = function(accountId){
    ss.matchListUrl = 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + accountId + '/recent?api_key=' + key;
    return $http.get(ss.matchListUrl).then(function(response){
      return response.data
    });//end http
  };//end searchMatch

  ss.specificMatch = function(matchId){
    ss.matchUrl = 'https://na1.api.riotgames.com/lol/match/v3/matches/' + matchId + '?api_key=' + key;
    return $http.get(ss.matchUrl).then(function(response){
      return response.data;
    });//end http
  };//end specificMatch

});//end SearchService
