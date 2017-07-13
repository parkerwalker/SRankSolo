app.controller('LoginController', function(LoginService, $location){
  var vm = this;
  console.log('in LoginController');

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
      console.log(response);
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
    console.log('login click', loginInfo);

    LoginService.loginAttempt(loginInfo).then(function(response){
      console.log(response.data);
      LoginService.loggedIn = true;
      vm.loggedIn = LoginService.loggedIn;
      if(response.data === 'match'){
        vm.go('/display');
      } else {
        alert('Password not a match')
      }
    });

  };//end loginUser

});//end LoginController
