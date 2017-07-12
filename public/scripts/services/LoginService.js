app.service('LoginService', function($http){
  console.log('in LoginService');

  ls = this;
  ls.summonerName = '';
  ls.loggedIn = false;
  console.log(ls.loggedIn, ls.summonerName);

  ls.registerAttempt = function(data){
    var returnResponse = {}

    ls.summonerCheckUrl = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + data.userName + '?api_key=' + key;
    return $http.get(ls.summonerCheckUrl).then(function(check){
      if (check.data.name == data.userName){
         return $http.post('/register', data).then(function(response){
          console.log(response);
          returnResponse = response;
          return returnResponse;
        });
      }//end if that checks if summonerName is valid
      //return returnResponse;
    })

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
