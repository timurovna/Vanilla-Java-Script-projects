const questionsEl = document.getElementById('questions');
const submitBtn = document.getElementById('btn');
const containerEl = document.getElementById('container');
const resultsEl = document.getElementById('results');
const newBtn = document.getElementById('new-btn');
const selectedCategory = document.getElementById('categories');
var countCorrect = 0;
var correctAnswers = [];
var numUnchecked = 0;


function takeAgain(){
	var newBtn = document.createElement('button');
	newBtn.setAttribute('id', 'new-btn');
	newBtn.classList.add('new-btn');
	newBtn.innerHTML = "Take test again";
	containerEl.appendChild(newBtn);
}
function displayResults(){
	resultsEl.innerHTML = `<h2>You have <span>${countCorrect}</span> correct answers</h2>`;
	takeAgain();
}
function checkResults(){
	numUnchecked = 0;
	for(var i=0; i<10; i++){
		var radios = document.getElementsByName('ans'+i);
		console.log(radios);
		for(var j=0; j<radios.length; j++){
			if (radios[j].checked){
				if (radios[j].value===correctAnswers[i]){
				countCorrect++;
				}
			}
			else{
				numUnchecked++;
			}
		}
	}
	if (numUnchecked > 30){
		alert("Please check all questions")
	}
	else{
		displayResults();
	}
}
function displayQuestions(data){
	for (var i=0; i<10; i++){
		var questionEl = document.createElement("div");
		questionEl.classList.add("question");
		questionEl.innerHTML = `<p>${data[i].question}</p>`;
		questionsEl.appendChild(questionEl);
		for (var j=0; j<data[i].incorrect_answers.length; j++){
			var answer = document.createElement('ans');
			answer.innerHTML = `<input type="radio" name="ans${i}" value="${data[i].incorrect_answers[j]}"><label>${data[i].incorrect_answers[j]}</label>`;
			questionEl.appendChild(answer);
		}
		var corr_ans = document.createElement('cor_ans');
		corr_ans.innerHTML = `<input type="radio" name="ans${i}" value="${data[i].correct_answer}""><label>${data[i].correct_answer}</label>`;
		questionEl.appendChild(corr_ans);
		correctAnswers.push(data[i].correct_answer);
	}
	submitBtn.style.display = "flex";
}
function resetVars(){
	questionsEl.innerHTML = '';
	countCorrect = 0;
	correctAnswers = [];
	resultsEl.innerHTML = '';
}
function getData(){
	resetVars();
	var category = selectedCategory.value;
	console.log(category);
	fetch(`https://opentdb.com/api.php?amount=10&category=${category}`)
	.then(response => 
	response.json())
	.then(data => 
		displayQuestions(data.results));
}

submitBtn.addEventListener('click', checkResults);
containerEl.addEventListener('click', function(event){
	if (event.target.className === "new-btn"){
		resetVars();
		event.target.remove();
		getData();
	}
});

selectedCategory.addEventListener('change', getData);








