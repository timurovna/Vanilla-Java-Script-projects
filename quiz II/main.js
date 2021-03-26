var nextBtn = document.getElementById('next-btn');
var prevBtn = document.getElementById('prev-btn');
var takeAgainBtn = document.getElementById('take-again');
var questions = [];
var answers = [];
var correctAnswers = [];
var checkedAnswers = [];
var category = document.getElementById('categories');
var questionEl = document.getElementById('question');
var counter = -1;
var numCorrect = 0;
var flag = false;
var quiz = document.getElementById('quiz');
var resultsEl = document.getElementById('results');
var unchecked = 0;

function saveAnswers(){
	if (counter > 0){
		unchecked = 0;
		var radios = document.getElementsByName('ans'+(counter-1));
		for (var j=0; j<radios.length; j++){
			if (radios[j].checked){
			checkedAnswers.push(radios[j].value);
			}
			else{
				unchecked++;
			}
		}
	}

}
function getResults(){
	for (var i=0; i<10; i++){
		if (checkedAnswers[i] === correctAnswers[i]){
			numCorrect++;
		}
	}
	var element = document.createElement('h1');
	element.innerHTML = `You have ${numCorrect} correct answers`;
	resultsEl.appendChild(element);
	questionEl.innerHTML='';
	nextBtn.style.display = "none";
	prevBtn.style.display = "none";
	quiz.style.display = "none";
	document.getElementById('choose-category').style.display = "none";
	takeAgainBtn.style.display = "flex";
}
function displayQuestion(){

	if (flag === true){
		counter--;
	}
	else{
		counter++;
	}
	saveAnswers();
	if (unchecked===4){
		alert('Please choose one option');
	}
	else{
		if (counter===10){
			getResults();
		}
		else{
			questionEl.innerHTML='';
			var element = document.createElement('p');
			element.innerHTML = `<p>${questions[counter]}</p>`;
			questionEl.appendChild(element);
			for(var i=0; i<answers[counter].length; i++){
				var answerEl = document.createElement('div');
				answerEl.innerHTML = `<input type="radio" name="ans${counter}" value="${answers[counter][i]}"><label>${answers[counter][i]}</label>`;
				questionEl.appendChild(answerEl);
			}
			nextBtn.style.display = "flex";
			if (counter > 0){
				prevBtn.style.display = "flex";
			}
			else if (counter===0){
				prevBtn.style.display = "none";
			}
			flag = false;
		}
	}
	
}
function shuffleArrayItems(array){
	var temp = '';
	for(var i=0; i<20; i++){
		randomIndex1 = Math.floor(Math.random()*(array.length));
		randomIndex2 = Math.floor(Math.random()*(array.length));
		if (randomIndex1!==randomIndex2){
			temp = array[randomIndex1];
			array[randomIndex1] = array[randomIndex2];
			array[randomIndex2] = temp;
		}
	}
}
function dataToArrays(data){
	for(var i=0; i<10; i++){
		questions.push(data[i].question);
		correctAnswers.push(data[i].correct_answer);
		answers.push(data[i].incorrect_answers);
		answers[i].push(data[i].correct_answer);
		shuffleArrayItems(answers[i]);
	}
	displayQuestion();
}
function getData(){
	questions = [];
	answers = [];
	correctAnswers = [];
	checkedAnswers = [];
	numCorrect = 0;
	fetch(`https://opentdb.com/api.php?amount=10&category=${category.value}`)
		.then(res=>res.json())
		.then(data=>{
			dataToArrays(data.results);
		})
}
function resetData(){
	counter = -1;
	takeAgainBtn.style.display = "none";
	resultsEl.innerHTML ='';
	quiz.style.display = "flex";
	document.getElementById('choose-category').style.display = "flex";
}
category.addEventListener('change', getData);
nextBtn.addEventListener('click', displayQuestion);
prevBtn.addEventListener('click', function(){
	flag = true;
	displayQuestion();
});
takeAgainBtn.addEventListener('click', function(){
	resetData();
	category.addEventListener('change', getData);
});

