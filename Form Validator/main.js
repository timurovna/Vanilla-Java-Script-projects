var username = document.getElementById("username");
var email  = document.getElementById("email");
var password = document.getElementById("password");
var password2 = document.getElementById("password2");
var form = document.getElementById("form");


function showError(input, message) {
	var formControl = input.parentElement;
	formControl.className = 'form-control error';
	var small = formControl.querySelector('small');
	small.innerText = message;
}

function showSuccess(input){
	var formControl = input.parentElement;
	formControl.className = 'form-control success';
}
function isValidEmail(email){
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function checkLength(input, min, max) {
	if (input.value.length < min){
		showError(input, 'Must be at least ' + min);
	}
	else if (input.value.length > max){
		showError(input, 'Must be less than ' + max);
	}
	else {
		showSuccess(input);
	}
}

function checkPasswordsMatch(password1, password2){
	if(password1.value !== password2.value){
		showError(password2, 'Passwords do not match');
	}
	else{
		showSuccess(password2);
	}
}
form.addEventListener("submit", function(e){
	e.preventDefault();
	if (username.value === ""){
		showError(username, 'Username is required');
	}
	else{
		checkLength(username, 3, 15);
	}


	if (email.value === ""){
		showError(email, 'Email is required');
	}
	else if (isValidEmail(email.value)===false){
		showError(email, 'Email is not valid')
	}
	else{
		showSuccess(email);
	}


	if (password.value === ""){
		showError(password, 'Password is required');
	}
	else{
		checkLength(password, 6, 25);
	}
	if (password2.value === ""){
		showError(password2, 'Password2 is required');
	}
	else{
		checkPasswordsMatch(password, password2);
	}
});

