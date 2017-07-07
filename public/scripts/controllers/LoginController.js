app.controller('LoginController', function(LoginService){
  var vm = this;
  console.log('in LoginController');

  vm.summonerName = '';
  vm.password = '';

  vm.registerUser = function(){
    console.log(vm.summonerName, vm.password);
    var loginInfo = {
      userName: vm.summonerName,
      password: vm.password
    }

    LoginService.registerAttempt(loginInfo);

  };//end registerUser

});//end LoginController
