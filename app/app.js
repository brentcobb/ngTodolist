angular.module('Todo', [])
  .config(function($routeProvider) {
    'use strict';

    $routeProvider
      .when('/', {
        controller: 'MainCtrl',
        templateUrl: '/app/templates/main.html'
      });
    
  });