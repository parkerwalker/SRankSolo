app.controller('NotesController', function(LoginService, NotesService) {
  var vm = this;
  console.log('in notes controller');
  vm.allChampionsArray = [];
  vm.searchInputs = [];


  vm.recentMatchData = NotesService.recentMatchData;
  vm.laneMatchup = NotesService.laneMatchup;
  vm.matchUpSearch = {};
  vm.laneSearch = '';
  console.log(allChampions);
  //this loops throught the object of objects
  for (var key in allChampions.data){
    if(!allChampions.data.hasOwnProperty(key)) continue;

    var obj = allChampions.data[key];
    for (var prop in obj){
      if(!obj.hasOwnProperty(prop)) continue;
    }
    vm.allChampionsArray.push(obj);
  }//end for loop of flat data


  vm.searchNotes = function(){
    console.log(vm.selectedChampion1.originalObject.id);
    objectToSearch = {
      champs: [],
      lane: vm.laneSearch,
      createdBy: LoginService.summonerName
    }

    objectToSearch.champs.push(vm.selectedChampion1.originalObject.id, vm.selectedChampion2.originalObject.id)
    console.log(objectToSearch);
    NotesService.searchParams(objectToSearch).then(function(response){
      vm.returnNotes = response.data;
      console.log(vm.returnNotes);
    })
  };//end searchNotes

});//end controller
