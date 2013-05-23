//////////////////    Main Controller  /////////////////////////////////////////
//
// This is the main controller
////////////////////////////////////////////////////////////////////////////////



angular.module('Todo').controller('MainCtrl', function($scope) {
  'use strict';


  /////////////////////////////////////
  // Initialize the $scope.todos array
  /////////////////////////////////////

  $scope.todos = [];

/////////////////    Loading Todo Lists   /////////////////////////////////////
//
//  Here is where saved todo lists will be loaded back into view
///////////////////////////////////////////////////////////////////////////////
/*
  $pouch.allDocs({include_docs: true}, function(err, reponce) {
    $scope.$apply(function() {
      response.rows.forEach(function(row) {
        $scope.todos.push(row.doc);
      });
    });
  });*/

  ////////////////    New Todo Creation /////////////////////////////////////////
  //
  //  The todo function, this will be used to add new todos.  Each newTodo is given
  // a uuid, the text of it is set to $scope.todoText, and it is set to not done.
  //  Then pouch comes into play.  It saves newTodo's and gives them and id and rev
  // use in the database.
  ///////////////////////////////////////////////////////////////////////////////

  $scope.addTodo = function() {
    var newTodo = {
      _id: Math.uuid(),
      text: $scope.todoText,
      done: false
    };

    $scope.todo.push(newTodo);

    $scope.todoText = '';
/*    $pouch.post(newTodo, function(err, res) {
      if (err) {console.log(err); }
      newTodo._id = res.id;
      newTodo._rev = res.rev;
    }); */
  };

  /////////////////    The Remover ///////////////////////////////////////////
  //
  // This function removes completed todos.  First it backs up the array, 
  // then it resets it to an empty array, then it loops through all old todos
  // then it checks to see if each todo is done, if so it is added to the array
  // if not it is removed.  Basically it removes items marked as done.
  ////////////////////////////////////////////////////////////////////////////

  $scope.removeDone = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if(!todo.done) {
        $scope.todos.push(todo);
      }
      else {
        $scope.removeTodo(todo);
      }
    });
  };

////////////////    Remove done todo's ////////////////////////////////////////
//
// This function will remove todo's
///////////////////////////////////////////////////////////////////////////////

  $scope.removeTodo = function(todo) {
    $pouch.remove(todo);
  };

//////////////////    Counts Remaining  /////////////////////////////////////
//
// This function figures out how many todos are remaining.  It does this by first
// setting the count to 0, then going through each todo and counting them and
// then returns the count.
//////////////////////////////////////////////////////////////////////////////


  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

 

//////////////// Update Todo Lists ////////////////////////////////////////////
//
// Here the todo lists will be updated.
///////////////////////////////////////////////////////////////////////////////

  $scope.updateTodo = function(todo) {
      $pouch.put(todo);
  };


});










