
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
	var poleB = document.getElementById("poleBukv").value;
	var poleC = document.getElementById("poleCisel").value;
	if (poleB.length === 2 && poleC.length === 7) {
		flag = true;
	}
	if (flag) {
		document.getElementById("poleBukv").value = "";
		document.getElementById("poleCisel").value = "";
	 	alert(string);
	 }
}