import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.BUTTON.onCreated(function helloOnCreated() {
  this.valid = new ReactiveVar();
});

Template.BUTTON.helpers({
  valid() {
    	return Template.instance().valid.get();
  },
});

Template.SERIES.events({
  'keypress input'(event){
    var charCode = event.which;
    if ((charCode < 65 || charCode > 90) && (charCode <97 || charCode > 122)) { 
      return false; 
    } 
    return true; 
  }
});

Template.NUMBER.events({
  'keypress input'(event){
    var charCode = event.which;
    if (charCode < 48 || charCode > 57) { 
      return false; 
    } 
    return true;
  }
});

Template.BUTTON.events({ 
  'click button'(event, instance) { 
    var lettersField = document.getElementById("field_of_letters").value; 
    var numbersField = document.getElementById("field_of_numbers").value; 
    if (lettersField.length === 2 && numbersField.length === 7) { 
      event.preventDefault(); 
    Meteor.call('checkData', lettersField.toUpperCase()+numbersField, function (error, result) { 
    if(result) 
      alert("Данные правильные"); 
    else 
      alert("Данные неверные")}); 
    document.getElementById("field_of_numbers").value = ""; 
    document.getElementById("field_of_letters").value = ""; 
} } 
});
