
		//	The Pouch Service
		//
		//	This is where the Pouch Service will be, not sure what it does atm


angular.module('todo')
	.value('$pouch', Pouch('idb://todos'));
