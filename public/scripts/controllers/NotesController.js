app.controller('NotesController', function(LoginService) {
  var vm = this;
  console.log('in notes controller');

  vm.getNotes =  function(){
    console.log('getting notes');
  };//end get notes


});//end controller
