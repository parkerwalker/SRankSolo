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
        console.log(vm.recentMatchData);

      });//end searchservice.searchmatch call
    });//end searchservice.searchSummoner call
  };//end searchinput

vm.specificMatchCall = function(index){
  console.log('looking for ', vm.recentMatchData[index]);
}

});//end controller
