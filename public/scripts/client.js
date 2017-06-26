console.log('js');

var app = angular.module('app', []);

app.controller('MainController', function(SearchService){
  var vm = this;

  vm.summonerSearch = {};
  vm.recentMatchData = [];

  vm.summonerInput = function(){
    var summonerName = vm.summonerName;
    var searchUrl = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summonerName + '?api_key=RGAPI-a29e06a2-b330-4bdb-adaf-82e3ba71c924';

    SearchService.searchSummoner(searchUrl).then(function(data){
      vm.summonerSearch = data;
      console.log('in controller', data);

      var accountId = vm.summonerSearch.accountId;
      SearchService.searchMatch(accountId).then(function(returnData){
        console.log('match', returnData);
        vm.recentMatchData = returnData.matches;
        for (var i = 0; i < vm.recentMatchData.length; i++) {
          SearchService.specificMatch(vm.recentMatchData[i].gameId).then(function(response){
            console.log('specificMatch', response);
          });//end then
        };//end for

      });//end searchservice.searchmatch call
    });//end searchservice.searchSummoner call


  };//end searchinput

});//end controller
