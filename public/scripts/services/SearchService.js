app.service('SearchService', function($http){
  console.log('searchservice');

  ss = this;

  ss.currentGame = function(summonerId){
    ss.currentUrl = 'https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/' + summonerId + '?api_key=RGAPI-a29e06a2-b330-4bdb-adaf-82e3ba71c924'
    return $http.get(ss.currentUrl).then(function(response){
      return response.data;
    })
  }

  ss.searchSummoner = function(url){
    return $http.get(url).then(function(response){
      return response.data;
    });//end searchUrl
  };//end searchGif

  ss.searchSummonerMastery = function(summonerId){
    ss.masteryUrl = 'https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/' + summonerId + '?api_key=RGAPI-a29e06a2-b330-4bdb-adaf-82e3ba71c924'
    return $http.get(ss.masteryUrl).then(function(response){
      return response.data;
    });//end http
  };//end searchSummonerMastery

  ss.searchMatch = function(accountId){
    ss.matchListUrl = 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + accountId + '/recent?api_key=RGAPI-a29e06a2-b330-4bdb-adaf-82e3ba71c924'
    return $http.get(ss.matchListUrl).then(function(response){
      return response.data
    });//end http
  };//end searchMatch

  ss.specificMatch = function(matchId){
    ss.matchUrl = 'https://na1.api.riotgames.com/lol/match/v3/matches/' + matchId + '?api_key=RGAPI-a29e06a2-b330-4bdb-adaf-82e3ba71c924'
    return $http.get(ss.matchUrl).then(function(response){
      return response.data;
    });//end http
  };//end specificMatch

});//end SearchService
