angular.module('Contact', [])
  .config(function($routeProvider, $locationProvider ) {
    'use strict'; 
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {controller: 'MainCtrl',templateUrl: '/app/templates/main.html'});
    
});