app.controller('LoginController', function(LoginService, $location){
  var vm = this;
  console.log('in LoginController');

  vm.go = function(path){
    $location .url(path);
  };//end go function

  vm.summonerName = '';
  vm.password = '';
  vm.logged = false;

  vm.registerUser = function(){
    var loginInfo = {
      userName: vm.summonerName,
      password: vm.password
    }
    LoginService.registerAttempt(loginInfo).then(function(response){
      console.log(response);
    });//end registerAttempt
  };//end registerUser

  vm.loginUser = function(){
    var loginInfo = {
      userName: vm.summonerName,
      password: vm.password
    }
    console.log('login click', loginInfo);

    LoginService.loginAttempt(loginInfo).then(function(response){
      console.log(response.data);
      LoginService.loggedIn = true;
      vm.logged = LoginService.loggedIn;
      if(response.data === 'match'){
        vm.go('/display');
      }
    });

  };//end loginUser

});//end LoginController
