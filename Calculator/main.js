var field = document.getElementById("field");
var plus = document.getElementById("plus");
var minus = document.getElementById("minus");
var division = document.getElementById("division");
var mult = document.getElementById("mult");
var saveFirstParam = 0;
var saveOperation = "";
var flag = false;

function fillField(buttonVal){
	if (field.innerHTML === "0" || flag === true){
		field.innerHTML = buttonVal;
		flag = false;
	}
	else{
		field.innerHTML = field.innerHTML + buttonVal;
	}
	plus.style.backgroundColor = "orange";
	minus.style.backgroundColor = "orange";
	division.style.backgroundColor = "orange";
	mult.style.backgroundColor = "orange";
}

function result(){
	if (saveOperation === "+"){
		field.innerHTML = parseInt(saveFirstParam) + parseInt(field.innerHTML);
	}
	else if (saveOperation === "-"){
		field.innerHTML = parseInt(saveFirstParam) - parseInt(field.innerHTML);
	}
	else if (saveOperation === "x"){
		field.innerHTML = parseInt(saveFirstParam) * parseInt(field.innerHTML);
	}
	else{
		field.innerHTML = parseInt(saveFirstParam) / parseInt(field.innerHTML);
	}
	flag = false;
}

function percentage(){
	field.innerHTML = parseInt(field.innerHTML)/100;
}

function checkBtnColor(button){
	if (button.style.backgroundColor === "grey"){
		return true;
	}
	else{
		return false;
	}
}

function clean(){
	field.innerHTML = 0;
}

function operation(event){
	event.style.backgroundColor = "grey";
	saveFirstParam = field.innerHTML;
	saveOperation = event.innerHTML;
	flag = true;
}