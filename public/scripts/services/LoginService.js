app.service('LoginService', function($http){
  console.log('in LoginService');

  ls = this;
  ls.summonerName = '';
  ls.loggedIn = false;
  console.log(ls.loggedIn, ls.summonerName);

  ls.registerAttempt = function(data){
    return $http({
      method: 'POST',
      url: '/register',
      data: data
    }).then(function(response){
      return response;
    });
  };//end registerAttempt

  ls.loginAttempt = function(data){
    return $http({
      method: 'POST',
      url: '/login',
      data: data
    }).then(function(response){
      ls.summonerName = data.userName;
      console.log(ls.summonerName);
      return response;
    });
  };//end loginAttempt

});//end LoginService
