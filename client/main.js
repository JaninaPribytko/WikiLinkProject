import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.BUTTON.onCreated(function helloOnCreated() {
  this.valid = new ReactiveVar();
});


Template.SERIES.events({
  'keypress input'(event){
  	 var lettersField = document.getElementById("field_of_letters").value; 
    var charCode = event.which;
 if ((charCode < 65 || charCode > 90) && (charCode <97 || charCode > 122) && (charCode < 48 || charCode > 57)) { 
     return false; 
    } 
    return 	true; 
  }
});

Template.BUTTON.events({ 
  'click button'(event, instance) { 
    var lettersField = document.getElementById("field_of_letters").value; 
    if (lettersField.length === 9){
     	if (/\D\D\d\d\d\d\d\d\d/.test(lettersField)){
     		event.preventDefault(); 
    		Meteor.call('checkData', lettersField.toUpperCase(), function (error, result) { 
    		if(result) 
      			alert("Данные правильные"); 
    		else 
      			alert("Данные неверные");
      		}); 
		} 
		else  {alert("Неверный формат. Ввод в формате AB1234567");} 
	document.getElementById("field_of_letters").value=""; 
	}
 }
});
