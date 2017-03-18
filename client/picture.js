import './main.html';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
 
  var picName;
  var span=null;

Template.PARSE.onCreated(function helloOnCreated() {  
 this.valid = new ReactiveVar();
});


Template.PARSE.events({ 
  'click'(event, instance) { 
document.getElementById('file').addEventListener('change', handleFileSelect, false);
document.getElementById('res').addEventListener('click', reset, false);
}
 });


Template.PARSE.events({ 
  'click button'(event, instance) { 
   parse_the_picture(picName);
   reset;
  //var form = document.getElementById('form_download');
   //form.
   span.innerHTML=['<label id="wait" style="font-size: 20px; margin-left: 350px; background: white; color: #CE0000; border: 2px solid #FF5353;padding:3px;">Подождите, идет сканирование данных...</label>'].join(''); 
    event.preventDefault(); 
  }
 });

function parse_the_picture(picName) {        
   Tesseract.recognize(picName, 'eng')
            .then(function (res) {
              var string =res.text;
              string=string.substr(string.lastIndexOf('<<<<')+4);
               console.log(string);
               document.getElementById('wait').innerHTML="Сканирование завершено";
string.replace(/\s\w*/, "");
  console.log(string);
var pos;
var number;
var idenNumber;

if((pos = string.indexOf("BLR"))>-1){ 
	idenNumber = string.substr(pos+18,14);
	console.log("idenNumber = "+idenNumber);
	number = (string.substring(pos,pos-10).substring(0, (string.substring(pos,pos-10)).length-1));
	console.log("numder = "+number);
}else if(((pos = string.indexOf("PB"))>-1)||(pos = string.indexOf("P"))>4){
	idenNumber = string.substring(pos+3,pos-11);
	console.log("idenNumber = "+idenNumber);
	number = string.substring(pos-30,pos-39);
	console.log("numder = "+number);

}else if((pos = string.indexOf(/\D\D/))==0){
    idenNumber = string.substring(pos+28,14);
	console.log("idenNumber = "+idenNumber);
	number = string.substr(pos, 9);
	console.log("numder = "+number);
}
    });

};

function reset() {
	 document.getElementById('output').removeChild(span);
	 span.innerHTML="";	
}      

function handleFileSelect(evt) {
    var file = evt.target.files;
    var f = file[0];
    if (!f.type.match('image.*')) {
        alert("Image only please....");
    }
    var reader = new FileReader();

    reader.onload = (function(theFile) {
        return function(e) {
        	var span1 = span;
            span= document.createElement('span');
            span.innerHTML = ['<img class="fordownload" title="', escape(theFile.name), '" src="', e.target.result, '" width="150" height="100"/>'].join('');
            document.getElementById('output').insertBefore(span, null);
            picName=e.target.result;
            if(span1!=null&&span1.innerHTML!=""){
            	document.getElementById('output').replaceChild(span, span1);
        	}
        };
    })(f);
    reader.readAsDataURL(f);
};
