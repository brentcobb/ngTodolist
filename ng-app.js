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


angular.module('Todo')
	.value('$pouch', Pouch('idb://todos'));

angular.module('Todo')
	.controller('MainCtrl', function($scope, $pouch) {

		$scope.todos = [];

		$scope.addTodo = function() {
			var newTodo = {
				_id: Math.uuid(),
				text: $scope.todoText,
				done: false
			};
			$scope.todos.push(newTodo);
			$scope.todoText = '';
		};

		$scope.removeDone = function() {
			var oldTodos = $scope.todos;
			$scope.todos = [];
			angular.forEach(oldTodos, function(todo) {
				if(!todo.done) {
					$scope.todos.push(todo);
				} else {
						$scope.removeTodo(todo);
					}
				});
		};

		$scope.remaining = function() {
			var count = 0;
			angular.foreach($scope.todos, function(todo) {
				count += todo.done ? 0 : 1;
			});
			return count;
		};

		$scope.addTodo = function() {
			var newTodo = {
				_id: Math.uuid(),
				text: $scope.todoText,
				done: false
			};
			$scope.todos.push(newTodo);
			$scope.todoText = '';
			$pouch.post(newTodo, function(err, res) {
				if (err) { console.log(err); }
				newTodo._id = res.id;
				newTodo._rev = res.rev;
			});
		};
			
		$pouch.allDocs({include_docs: true}, function(err, response) {
			$scope.$apply(function() {
				response.rows.forEach(function(row) {
					$scope.todos.push(row.doc);
				});
			});
		});

		$scope.removeTodo = function(todo) {
			$pouch.remove(todo);
		};
		
		$scope.updateTodo = function(todo) {
			$pouch.put(todo);
		};
	});
