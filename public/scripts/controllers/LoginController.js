app.controller('LoginController', function(LoginService, $location){
  var vm = this;
  vm.go = function(path){
    $location .url(path);
  };//end go function

  //vm.summonerName = '';
  //vm.password = '';
  vm.loggedIn = false;

  vm.registerUser = function(){
    var loginInfo = {
      userName: vm.summonerName,
      password: vm.password
    }
    vm.summonerName = '';
    vm.password = '';
     LoginService.registerAttempt(loginInfo).then(function(response){
      if(response.data == 3){
        alert('Summoner Name Already used');
      }
    });//end registerAttempt
  };//end registerUser

  vm.loginUser = function(){
    var loginInfo = {
      userName: vm.summonerName,
      password: vm.password
    }
    vm.summonerName = '';
    vm.password = '';

    LoginService.loginAttempt(loginInfo).then(function(response){
      LoginService.loggedIn = true;
      vm.loggedIn = LoginService.loggedIn;
      if(response.data === 'match'){
        vm.go('/display');
      } else if (response.data == 400){
        alert("'"+ loginInfo.userName + "'" + ' is not a vaild username')
      }else {
        alert('Password not a match')
      }
    });

  };//end loginUser

});//end LoginController
