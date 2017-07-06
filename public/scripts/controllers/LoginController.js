app.controller('LoginController', function(LoginService){
  var vm = this;
  console.log('in LoginController');

  vm.registerUser = function(){
    console.log('in register');
    LoginService.loginAttempt(){
      console.log('hit to LoginService');
    };//end then
  };//end registerUser

});//end LoginController
