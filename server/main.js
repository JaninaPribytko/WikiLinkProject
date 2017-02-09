import { Meteor } from 'meteor/meteor'; 

Meteor.methods({ 
	checkData: function (fdata) {  
		return 	(fdata.localeCompare("AB1234567")==0); 
	} 
});