import { Meteor } from 'meteor/meteor'; 

Meteor.methods({ 
	checkData: function (surname, name, secondName, privateNumber, number) { 
		var stringInformation = "";
		if (number.localeCompare("AB1234567")==0){
			stringInformation = "выдан, действителен, дата выдачи 11.11.11";
		}else{
			stringInformation = "не выдавался";
		}
		return stringInformation;
	} 
});