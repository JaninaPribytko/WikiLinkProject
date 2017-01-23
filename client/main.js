
import './main.html';
function onlyNum(evt) { 
	var charCode = evt.which; 
	if (charCode < 48 || charCode > 57) { 
		return false; 
	} 
	return true; 
}

function onlyAB(evt){
	var charCode = evt.which; //141 - 172
	if ((charCode < 65 || charCode > 90) && (charCode <97 || charCode > 122)) { 
		return false; 
	} 
	return true; 
}

function msg(){
	var string = "Ваши данные приняты"; 
	var flag = false;
	var lettersField = document.getElementById("field_of_letters").value;
	var numbersField = document.getElementById("field_of_numbers").value;
	if (lettersField.length === 2 && numbersField.length === 7) {
		flag = true;
	}
	if (flag) {
		document.getElementById("field_of_letters").value = "";
		document.getElementById("field_of_numbers").value = "";
	 	alert(string);
	 }
}