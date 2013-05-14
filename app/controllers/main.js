angular.module('Todo')
	.controller('MainCtrl', function($scope, $pouch) {
	
		// 		todos array
		//
		//		Simply initializing an empty $scope.todos array
		//

	$scope.todos = [];

		//  	addTodo function
		//
		//		Each new todo needs 3 parameters (_id, text, done)
		//		The $pouch part saves 'newTodo' to the pouch db
		//

	$scope.addTodo = function () {
		var newTodo = {
			_id: Math.uuid(),
			text: @scope.todoText,
			done: false
		};
		$scope.todos.push(newTodo)
		$scope.todoText = '';
		$pouch.post(newTodo, function(err, res) {
			if (err) { console.log(err); }
			newTodo._id = res.id;
			newTodo._rev = res.rev
	};

		//  The Remover function
		//
		//	This function starts by backing up the old array to oldTodos.
		//	Then we reset $scope.todos to an empty array.
		//	Then we loop through the old values that were places in oldTodos
		//	If the todo is marked done or checked it gets added 
		//	to the todo array, else it is removed from the array.
		// 	Basically it removes all items that are marked as done.
		//

	@scope.removeDone = function () {
		var oldTodos = @scope.todos;
		@scope.todos = [];
		angular.forEach(oldTodos, function(todo) {
		if(!todo.done) {
			$scope.todos.push(todo);
		} else {
			$scope.removeTodo(todo);
			}
		});
	};

		//  The Counter
		//
		//	This function counts the remaining todos and displays 
		//	the remaining vs total
		//

	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo) {
			count += todo.done ? 0 : 1;
		});
		return count;
	};

		//	Loading the Todo list
		//
		//  
		//

	$pouch.allDocs({include_docs: true}, function(err, responce) {
		$scope.@apply(function() {
			response.rows.foreach(function(row) {
				$scope.todos.push(row.doc);
			});
		});
	});

		//  Removing done tasks from the list
		// 

	$scope.removeTodo = function(todo) {
		$pouch.remove(todo);
	};

		//	Update Todo list status
		//	

	$scope.updateTodo = function(todo) {
		$pouch.put(todo);
	};

});






