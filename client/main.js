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


function enterTheInformation() {
  var lettersField = document.getElementById("field_of_letters").value; 
  var resultLab = document.getElementById("resultLabel"); 
  var formatLab = document.getElementById("formatLabel"); 
  if (lettersField.length === 9){
    event.preventDefault(); 
    if (/\D\D\d\d\d\d\d\d\d/.test(lettersField)){
      Meteor.call('checkData', lettersField.toUpperCase(), function (error, result) { 
        if(result){
          resultLab.innerHTML='Паспорт соответствует образцу';
          resultLab.style.border='2px solid #32a32e';
          resultLab.style.display='inline';
          formatLab.style.visibility='hidden';
          setTimeout(function(){resultLab.style.display="none";}, 1500);
        }
        else {
          resultLab.innerHTML='Паспорт недействителен';
          resultLab.style.border='2px solid #FF5353';
          resultLab.style.display='inline';
          formatLab.style.visibility='hidden';
          setTimeout(function(){resultLab.style.display="none";}, 1500);
        }
      }); 
      document.getElementById("field_of_letters").value=""; 
    }
    else{ 
        formatLab.style.visibility='visible';
    }
  }
}

Template.BUTTON.events({ 
  'click button'(event, instance) { 
    enterTheInformation();
  }
 });

addEventListener("keydown", function(event){ 
  if(event.keyCode==13){
    enterTheInformation();
  }
});
