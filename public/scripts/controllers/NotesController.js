app.controller('NotesController', function(LoginService, NotesService) {
  var vm = this;
  console.log('in notes controller');

  vm.recentMatchData = NotesService.recentMatchData;
  vm.laneMatchup = NotesService.laneMatchup;
  vm.matchUpSearch = {};
  vm.matchUpSearch.laneSearch = '';
  vm.matchUpSearch.champSearch1 = '';
  vm.matchUpSearch.champSearch2 = '';


  vm.searchNotes = function(){
    objectToSearch = {
      champs: [],
      lane: vm.matchUpSearch.laneSearch,
      createdBy: LoginService.summonerName
    }

    objectToSearch.champs.push(vm.matchUpSearch.champSearch1, vm.matchUpSearch.champSearch2)
    NotesService.searchParams(objectToSearch).then(function(response){
      vm.returnNotes = response.data;
      console.log(vm.returnNotes);
    })
  };//end searchNotes

});//end controller
