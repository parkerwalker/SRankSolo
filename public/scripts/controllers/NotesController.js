app.controller('NotesController', function(LoginService, NotesService) {
  var vm = this;
  console.log('in notes controller');

  vm.recentMatchData = NotesService.recentMatchData;
  console.log(vm.recentMatchData);
  vm.laneMatchup = NotesService.laneMatchup;
  console.log(vm.laneMatchup);

  vm.getNotes =  function(){
    console.log('getting notes');
  };//end get notes


});//end controller
