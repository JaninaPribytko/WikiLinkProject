import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
//import Tesseract from 'tesseract.js';
import './main.html';

Template.BUTTON.onCreated(function helloOnCreated() {
   this.valid = new ReactiveVar();
});

function simbolsCheckEnglish(){
  var charCode = event.which;
  if ((charCode < 65 || charCode > 90) && (charCode <97 || charCode > 122) && (charCode < 48 || charCode > 57)) { 
    return false; 
  } 
  return  true; 
}

 function simbolsCheckRussian(){
  var charCode = event.which;
  if ((charCode < 192)){
    if((charCode!=45) && (charCode!=150) && (charCode!=151)) { 
      return false; 
    } 
  }
  return  true; 
}


function enterTheInformation() {

  var surnameField = document.getElementById("field_of_surname").value;
  var nameField = document.getElementById("field_of_name").value;
  var secondNameField = document.getElementById("field_of_second_name").value;
  var privateNumberField = document.getElementById("field_of_private_number").value;
  var seriesField = document.getElementById("field_of_letters").value;

  var resultLab = document.getElementById("resultLabel"); 
  var formatLabNumber = document.getElementById("formatLabelForNumber"); 
  var formatLabSeries = document.getElementById("formatLabelForSeries");

  if (privateNumberField.length === 14){
    if (seriesField.length === 9){
      event.preventDefault(); 
        if (/\d\d\d\d\d\d\d\D\d\d\d\D\D\d/.test(privateNumberField)){
          if (/\D\D\d\d\d\d\d\d\d/.test(seriesField)){
            Meteor.call('checkData', surnameField, nameField, secondNameField, privateNumberField.toUpperCase(), seriesField.toUpperCase(), function (error, result) { 
                resultLab.innerHTML=result;
                resultLab.style.border='2px solid #32a32e';
                resultLab.style.display='inline';
                formatLabSeries.style.visibility='hidden';
                formatLabNumber.style.visibility='hidden';
                setTimeout(function(){resultLab.style.display="none";}, 2000);
            }); 
            document.getElementById("field_of_letters").value=""; 
            document.getElementById("field_of_surname").value="";
            document.getElementById("field_of_name").value="";
            document.getElementById("field_of_second_name").value="";
            document.getElementById("field_of_private_number").value="";
          }
          else{ 
            formatLabNumber.style.visibility='hidden';
            formatLabSeries.style.visibility='visible';
          }
        }
      else{ 
        formatLabNumber.style.visibility='visible';
      }
    }
  }
}


Template.SURNAME.events({
  'keypress input'(event){
  //  var surnameField = document.getElementById("field_of_surname").value;
    return simbolsCheckRussian();
  }
});
Template.NAME.events({
  'keypress input'(event){
 // var nameField = document.getElementById("field_of_name").value;
   return simbolsCheckRussian();
    }
});
Template.SECOND_NAME.events({
  'keypress input'(event){ 
    return simbolsCheckRussian("");
  }
});

Template.PRIVATE_NUMBER.events({
  'keypress input'(event){
    return simbolsCheckEnglish();
  }
});


Template.SERIES.events({
  'keypress input'(event){
    return simbolsCheckEnglish();
  }
});


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
