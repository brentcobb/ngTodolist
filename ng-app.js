angular.module('Contact', [])
  .config(function($routeProvider, $locationProvider ) {
    'use strict'; 
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {controller: 'MainCtrl',templateUrl: '/app/templates/main.html'});
    
});
/////////////// The Pouch Service /////////////////////////////////////////////
//
// Here is where the pouch service will be stored
///////////////////////////////////////////////////////////////////////////////

angular.module('Contact')
  .value('$pouch', Pouch('idb://contacts'));
/*angular.module('plunker', ['ui.bootstrap']);
function CollapseDemoCtrl($scope) {
  $scope.isCollapsed = false;
}*/
/////////////////// Contact Controller ////////////////////////////////////////
//
//  This is where the controller for contacts will be stored.
///////////////////////////////////////////////////////////////////////////////


/*angular.module('Todo').controller('contactCtrl', function($scope) {

});*/
//////////////////    Main Controller  /////////////////////////////////////////
//
// This is the main controller
////////////////////////////////////////////////////////////////////////////////



angular.module('Contact').controller('MainCtrl', function($scope, $pouch) {



/////////////////////////////////////
// Initialize the $scope.contacts array
/////////////////////////////////////

  $scope.contacts = [];

/////////////////    Loading contact Lists   /////////////////////////////////////
//
//  Here is where saved contact lists will be loaded back into view
///////////////////////////////////////////////////////////////////////////////

  $pouch.allDocs({include_docs: true}, function(err, response) {
    $scope.$apply(function() {
      response.rows.forEach(function(row) {
        $scope.contacts.push(row.doc);
      });
    });
  });

////////////////    New contact Creation /////////////////////////////////////////
//
//  The contact function, this will be used to add new contacts.  Each newcontact is given
// a uuid, the text of it is set to $scope.contactText, and it is set to not done.
//  Then pouch comes into play.  It saves newcontact's and gives them and id and rev
// use in the database.
//
//  I have begun changing this into a contact list, this object will change into
//  the New contact creater eventually.  I have begun testing adding new properties 
//  to each contact.
///////////////////////////////////////////////////////////////////////////////

  $scope.addContact = function() {
    var newContact = {
      _id: Math.uuid(),
      job: $scope.contactJob,
      name: $scope.contactName,
      phone: $scope.contactPhone,
      address: $scope.contactAddress,
      email: $scope.contactEmail,
      done: false
    };

    $scope.contacts.push(newContact);

    $scope.contactText = '';
    $pouch.post(newContact, function(err, res) {
      if (err) { console.log(err); }
      newContact._id = res.id;
      newContact._rev = res.rev;
    });
  };

/////////////////    The Remover ///////////////////////////////////////////
//    
// 
//
// This function removes completed contacts.  First it backs up the array, 
// then it resets it to an empty array, then it loops through all old contacts
// then it checks to see if each contact is done, if so it is added to the array
// if not it is removed.  Basically it removes items marked as done.
////////////////////////////////////////////////////////////////////////////

  $scope.removeDone = function() {
    var oldContacts = $scope.contacts;
    $scope.contacts = [];
    angular.forEach(oldContacts, function(contact) {
      if(!contact.done) {
        $scope.contacts.push(contact);
      }
      else {
        $scope.removeContact(contact);
      }
    });
  };

////////////////    Remove done contact's ////////////////////////////////////////
//
// This function will remove contact's from pouch
///////////////////////////////////////////////////////////////////////////////

  $scope.removeContact = function(contact) {
    $pouch.remove(contact);
  };

/////////////////    Counts Remaining  /////////////////////////////////////
//
// This function figures out how many Contacts are remaining.  It does this by first
// setting the count to 0, then going through each contact and counting them and
// then returns the count.
//////////////////////////////////////////////////////////////////////////////


  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.contacts, function(contact) {
      count += contact.done ? 0 : 1;
    });
    return count;
  };

//////////////// Update contact Lists ////////////////////////////////////////////
//
// Here the contact lists will be updated to pouch
//////////////////////////////////////////////////////////////////////////////

  $scope.updateContact = function(contact) {
      $pouch.put(contact);
  };

});








