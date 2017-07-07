app.service('LoginService', function($http){
  console.log('in LoginService');

  ls = this;

  ls.registerAttempt = function(data){
    console.log(data);
    return $http({
      method: 'POST',
      url: '/register',
      data: data
    }).then(function(response){
      console.log('back from response', response);
    })
  };//end registerAttempt 

});//end LoginService
