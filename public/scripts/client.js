console.log('js');

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider.when('/notes', {
    templateUrl: 'views/partials/notes.html',
    controller: 'MainController as mc'
  }).when('/login', {
    templateUrl: 'views/partials/login.html',
    controller: 'MainController as mc'
  }).when('/display', {
  templateUrl: 'views/partials/display.html',
  controller: 'MainController',
  controllerAs: 'MainController as mc'
  })
});//end config

app.controller('MainController', function(SearchService){
  var vm = this;

  vm.summonerSearch = {};
  vm.recentMatchData = [];
  vm.championMastery = [];


  vm.summonerInput = function(){
    vm.summonerSearch = {};
    vm.recentMatchData = [];
    vm.championMastery = [];
    var summonerName = vm.summonerName;
    vm.summonerName = '';
    var searchUrl = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summonerName + '?api_key=RGAPI-a29e06a2-b330-4bdb-adaf-82e3ba71c924';

    SearchService.searchSummoner(searchUrl).then(function(data){
      vm.summonerSearch = data;
      console.log(vm.summonerSearch);

      var summonerId = vm.summonerSearch.id;
      SearchService.searchSummonerMastery(summonerId).then(function(data) {
        for (var i = 0; i < 5; i++) {
          vm.championMastery.push(data[i])
        }
        console.log(vm.championMastery);
      });//end searchSummonerMastery call

      var accountId = vm.summonerSearch.accountId;
      SearchService.searchMatch(accountId).then(function(returnData){
        vm.recentMatchData = returnData.matches;
        for (var i = 0; i < vm.recentMatchData.length; i++) {
          vm.recentMatchData[i].specificMatchTeams = {winning: [], losing: []};//this sets aside an empty array to file with specificMatchCall data
        }//end for loop
        console.log(vm.recentMatchData);

      });//end searchservice.searchmatch call
    });//end searchservice.searchSummoner call
  };//end searchinput

  vm.specificMatchCall = function(index){
    var gameId = vm.recentMatchData[index].gameId;
    console.log('looking for gameId', gameId);
    SearchService.specificMatch(gameId).then(function(response){
      vm.specificMatchData = response;
      var winningTeam = [];
      var losingTeam = [];
      if (winningTeam.length === 0) {
        for (var i = 0; i < vm.specificMatchData.participantIdentities.length; i++) {
          vm.recentMatchData[i].specificMatchTeams = []
          if (vm.specificMatchData.participants[i].stats.win) {
            if (vm.specificMatchData.participantIdentities[i].player == null || vm.specificMatchData.participantIdentities[i].player == 0){
              players = {
                id: i + 1,
                summonerName: 'Unavalable',
                champion: vm.specificMatchData.participants[i].championId,
                kills: vm.specificMatchData.participants[i].stats.kills,
                deaths: vm.specificMatchData.participants[i].stats.deaths,
                assists: vm.specificMatchData.participants[i].stats.assists,
                win: vm.specificMatchData.participants[i].stats.win,
                rank: vm.specificMatchData.participants[i].highestAchievedSeasonTier
              }//end object
            }else{
              players = {
                id: vm.specificMatchData.participantIdentities[i].participantId,
                summonerName: vm.specificMatchData.participantIdentities[i].player.summonerName,
                champion: vm.specificMatchData.participants[i].championId,
                kills: vm.specificMatchData.participants[i].stats.kills,
                deaths: vm.specificMatchData.participants[i].stats.deaths,
                assists: vm.specificMatchData.participants[i].stats.assists,
                win: vm.specificMatchData.participants[i].stats.win,
                rank: vm.specificMatchData.participants[i].highestAchievedSeasonTier
              }//end object
            }//end else
            winningTeam.push(players);
          }//end win if
          else{
            if (vm.specificMatchData.participantIdentities[i].player == null || vm.specificMatchData.participantIdentities[i].player == 0){
              players = {
                id: i + 1,
                summonerName: 'Unavalable',
                champion: vm.specificMatchData.participants[i].championId,
                kills: vm.specificMatchData.participants[i].stats.kills,
                deaths: vm.specificMatchData.participants[i].stats.deaths,
                assists: vm.specificMatchData.participants[i].stats.assists,
                win: vm.specificMatchData.participants[i].stats.win,
                rank: vm.specificMatchData.participants[i].highestAchievedSeasonTier
              }//end object
            }else{
              players = {
                id: vm.specificMatchData.participantIdentities[i].participantId,
                summonerName: vm.specificMatchData.participantIdentities[i].player.summonerName,
                champion: vm.specificMatchData.participants[i].championId,
                kills: vm.specificMatchData.participants[i].stats.kills,
                deaths: vm.specificMatchData.participants[i].stats.deaths,
                assists: vm.specificMatchData.participants[i].stats.assists,
                win: vm.specificMatchData.participants[i].stats.win,
                rank: vm.specificMatchData.participants[i].highestAchievedSeasonTier
              }//end object
            }//end else
            losingTeam.push(players);
          }//end losing else
          vm.recentMatchData[i].specificMatchTeams.winning = winningTeam;
          vm.recentMatchData[i].specificMatchTeams.losing = losingTeam;
        }//end for loop
      }//end if array empty


      console.log(vm.recentMatchData[0].specificMatchTeams.winning);

    });//end searchservice.specificMatch
  };//end specificMatchCall

  vm.currentGameCall = function(){
    var summonerId = vm.summonerSearch.id;
    console.log(vm.summonerSearch.id);
    SearchService.currentGame(summonerId).then(function(data){
      vm.oneCurrentGameTeam = [];
      vm.twoCurrentGameTeam = [];
      console.log(data);

      for (var i = 0; i < data.participants.length; i++) {
        if (data.participants[i].teamId === 100){
          playerOne = {
            name: data.participants[i].summonerName,
            champion: data.participants[i].championId
          }
          vm.oneCurrentGameTeam.push(playerOne);
        }else{
          playerTwo = {
            name: data.participants[i].summonerName,
            champion: data.participants[i].championId
          }
          vm.twoCurrentGameTeam.push(playerTwo);
        }//end else

      }//end loop
      console.log(vm.oneCurrentGameTeam, vm.twoCurrentGameTeam);
    });//end searchservice.currentGame
  };//end currentGameCall

});//end controller
