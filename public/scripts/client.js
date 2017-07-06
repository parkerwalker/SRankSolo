console.log('js');

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider.when('/notes', {
    templateUrl: 'views/partials/notes.html',
    controller: 'NotesController as nc'
  }).when('/login', {
    templateUrl: 'views/partials/login.html',
    controller: 'LoginController as lc'
    //controllerAs: 'LoginController as lc'
  }).when('/display', {
  templateUrl: 'views/partials/display.html',
  controller: 'MainController',
  controllerAs: 'MainController as mc'
});
});//end config
