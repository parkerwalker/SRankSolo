app.service('LoginService', function($http){
  console.log('in LoginService');

  ls = this;

  ls.loginAttempt = function(){
    return 'hahaha';
    console.log('in LoginService.loginAttempt');
  }

});//end LoginService
