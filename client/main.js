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
  'click button': function(event,instance) {
     event.preventDefault();
     instance.valid.set('Подождите...');
     Meteor.call('checkData', document.getElementById("field_of_letters").value, document.getElementById("field_of_numbers").value, function (error, result) { instance.valid.set(result) });
     	document.getElementById("field_of_numbers").value = "";
     	document.getElementById("field_of_letters").value = ""; 
  },
});