app.controller('MainController', function(SearchService, LoginService, NotesService, $location){
  var vm = this;
  var key = 'RGAPI-4a8351b9-31b9-4f7c-87c3-0df63f429faa';

  vm.summonerSearch = {};
  vm.recentMatchData = [];
  vm.championMastery = [];

  vm.loggedIn = LoginService.loggedIn;


  vm.addNotes = function(index){
    console.log('addnotes click', index);
    console.log(vm.recentMatchData[index]);

    for (var i = 0; i < vm.recentMatchData.length; i++) {
      if(vm.recentMatchData[i].viewAddNotes = true){
        vm.recentMatchData[i].viewAddNotes = false;
      }//end if
    }//end end loop

    vm.recentMatchData[index].viewAddNotes = true;
    console.log(vm.recentMatchData[index].viewAddNotes);

    vm.laneMatchup = {};
    vm.laneMatchup.wonLane = [];
    vm.laneMatchup.lostLane = [];
    vm.laneMatchup.lane = vm.recentMatchData[index].lane;

    for (var i = 0; i < vm.recentMatchData[index].specificMatchLosing.length; i++) {
        if (vm.recentMatchData[index].specificMatchLosing[i].lane == vm.recentMatchData[index].lane){
          vm.laneMatchup.lostLane.push(vm.recentMatchData[index].specificMatchLosing[i]);
        }//end if
    }//end for loop

    for (var i = 0; i < vm.recentMatchData[index].specificMatchWinning.length; i++) {
        if (vm.recentMatchData[index].specificMatchWinning[i].lane == vm.recentMatchData[index].lane){
          vm.laneMatchup.wonLane.push(vm.recentMatchData[index].specificMatchWinning[i]); 
        }//end if
    }//end for loop
    console.log(vm.laneMatchup);
    NotesService.laneMatchup = vm.laneMatchup;
  };//end addNotes

  // vm.initSummoner = function(){
  //   vm.summonerName = LoginService.summonerName;
  //
  //   vm.summonerInput();
  // };//end initSummoner

  vm.go = function(path){
    $location .url(path);
  };//end go function

  vm.summonerInput = function(){

    vm.go('/display');//redirects to display page

    vm.summonerSearch = {};
    vm.recentMatchData = [];
    vm.championMastery = [];

    var summonerName = vm.summonerName;
    var searchUrl = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summonerName + '?api_key=' + key;
    vm.summonerName = '';

    if (summonerName == LoginService.summonerName){
      vm.shownotes = true;
    }else{
      vm.shownotes = false;
    }//end shownotes if/else

    if(summonerName == null || summonerName == undefined || summonerName == ''){
      alert('No Summoner entered')
    }else{

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
            vm.recentMatchData[i].specificMatchWinning = [];
            vm.recentMatchData[i].specificMatchLosing = [];//this sets aside an empty array to file with specificMatchCall data
            vm.recentMatchData[i].showDeets = false;
            vm.recentMatchData[i].viewAddNotes = false;
          }//end for loop
          console.log(vm.recentMatchData);
        });//end searchservice.searchmatch call
      });//end searchservice.searchSummoner call
    }//end else
  };//end searchinput

  vm.specificMatchCall = function(index){
    var gameId = vm.recentMatchData[index].gameId;
    console.log('looking for gameId', gameId);
    SearchService.specificMatch(gameId).then(function(response){
      console.log(response);
      //hides all other match data
      for (var i = 0; i < vm.recentMatchData.length; i++) {
        if(vm.recentMatchData[i].showDeets = true){
          vm.recentMatchData[i].showDeets = false;
        }//end if
      }//end end loop
      //hides all viewAddNotes
      for (var i = 0; i < vm.recentMatchData.length; i++) {
        vm.recentMatchData[i].viewAddNotes = false;
      }//end loop

      vm.recentMatchData[index].showDeets = true;
      vm.specificMatchData = response;
      var winningTeam = [];
      var losingTeam = [];

      for (var i = 0; i < vm.specificMatchData.participantIdentities.length; i++) {

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
              rank: vm.specificMatchData.participants[i].highestAchievedSeasonTier,
              lane: vm.specificMatchData.participants[i].timeline.lane
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
              rank: vm.specificMatchData.participants[i].highestAchievedSeasonTier,
              lane: vm.specificMatchData.participants[i].timeline.lane
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
              rank: vm.specificMatchData.participants[i].highestAchievedSeasonTier,
              lane: vm.specificMatchData.participants[i].timeline.lane
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
              rank: vm.specificMatchData.participants[i].highestAchievedSeasonTier,
              lane: vm.specificMatchData.participants[i].timeline.lane
            }//end object
          }//end else
          losingTeam.push(players);
        }//end losing else
        vm.recentMatchData[i].specificMatchWinning = winningTeam;
        vm.recentMatchData[i].specificMatchLosing = losingTeam;
      }//end for loop
      vm.loggedIn = LoginService.loggedIn;
      NotesService.recentMatchData = vm.recentMatchData;
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
