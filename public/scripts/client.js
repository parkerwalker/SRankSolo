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
        vm.recentMatchData = returnData.matches;
        for (var i = 0; i < vm.recentMatchData.length; i++) {
          vm.recentMatchData[i].specificMatchPlayers = [];
        }
        console.log(vm.recentMatchData);

      });//end searchservice.searchmatch call
    });//end searchservice.searchSummoner call
  };//end searchinput

vm.specificMatchCall = function(index){
  var gameId = vm.recentMatchData[index].gameId;
  console.log('looking for gameId', gameId);
  SearchService.specificMatch(gameId).then(function(response){
    vm.specificMatchData = response;
    for (var i = 0; i < vm.specificMatchData.participantIdentities.length; i++) {

      if (vm.specificMatchData.participantIdentities[i].player == null || vm.specificMatchData.participantIdentities[i].player == 0){
        players = {
          summonerName: 'Unavalable'
        }
      }else{
        players = {
          summonerName: vm.specificMatchData.participantIdentities[i].player.summonerName
        }
      }//end else

      vm.recentMatchData[index].specificMatchPlayers.push(players);
    }//end for loop

    console.log(vm.specificMatchData);
  });//end searchservice.specificMatch
};//end specificMatchCall

});//end controller
