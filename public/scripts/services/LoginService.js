app.service('LoginService', function($http){

  ls = this;
  ls.summonerName = '';
  ls.loggedIn = false;
  var key = '';

  $http.get('/api').then( function(res){
    key = res.data;
  });//end api key call

  ls.registerAttempt = function(data){

    ls.summonerCheckUrl = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + data.userName + '?api_key=' + key;
    return $http.get(ls.summonerCheckUrl).then(function(check){
      console.log(check.body);
      if (check.data.name == data.userName){
         return $http.post('/register', data).then(function(response){
          return response;
        });
      }//end if that checks if summonerName is valid
      //return returnResponse;
    });//end http get to api

  };//end registerAttempt

  ls.loginAttempt = function(data){
    return $http({
      method: 'POST',
      url: '/login',
      data: data
    }).then(function(response){
      ls.summonerName = data.userName;
      return response;
    });
  };//end loginAttempt

});//end LoginService
