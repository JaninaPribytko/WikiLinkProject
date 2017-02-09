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
    var resultLab = document.getElementById("resultLable"); 
    if (lettersField.length === 9){
     	if (/\D\D\d\d\d\d\d\d\d/.test(lettersField)){
     		event.preventDefault(); 
    		Meteor.call('checkData', lettersField.toUpperCase(), function (error, result) { 
    		if(result){
      			resultLab.innerHTML='Ваши данные приняты';
      			resultLab.style.border='2px solid #32a32e';
				resultLab.style.display='inline';
				setTimeout(function(){resultLab.style.display="none";}, 1000);
    		}
    		else {
      				resultLab.innerHTML='Данные неверные';
      				resultLab.style.border='2px solid #FF5353';
					resultLab.style.display='inline';
				}

      		}); 
		} 
		else{	resultLab.innerHTML='Нeверный формат';
				resultLab.style.border='2px solid #FF5353';
				resultLab.style.display='inline';
			}
	document.getElementById("field_of_letters").value=""; 
	}
 }
});
