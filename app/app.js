		//	** $routeProvider and $locationProvider **
		//		
		//	$routeProvider allows us to do routing
		//	$locationProvider gives us html5 push updates

angular.module('Todo', [])
	.config(function($routeProvider, $locationProvider) {
		'uses strict';
		
		$routeProvider
			.when('/', {
				controller: 'MainCtrl',
				templateUrl: '/app/templates/main.html'
			});
		$locationProvider.html5mode(true);
	});

