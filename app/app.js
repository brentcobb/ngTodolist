		//In this file I am creating the config section.
		//
		//It will inject two services ($routeprovider, $locationProvider
		//$routeProvider gives us the ability to do routing
		//$locationProvider gives us html5 push updates


angular.module('Todo', [])
	.config(function($routeProvider, $locationProvider) {
		'use strict';

		$routeProvider
			.when('/', {
				controller: 'MainCtrl',
				templateUrl: 'app/templates/main.html'
			});
		$locationProvider.html5Mode(true);
	});
