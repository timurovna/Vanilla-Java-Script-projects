var difficultyEl = document.getElementById('difficulty');
var word = document.getElementById('word-to-type');
var scoreEl = document.getElementById('score');
var timeEl = document.getElementById('time');
var input = document.getElementById('input');
var mainDiv = document.getElementById('main');
var gameOverEl = document.getElementById('game-over');
var finalScore = document.getElementById('final-score');
var reloadBtn = document.getElementById('reload');
var score = 0;
var time = 11;

var difficulty = 'Easy';

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

chooseWord();

var timeInterval = setInterval(updateTime, 1000);

input.focus();
function updateTime(){
	time--;
	timeEl.innerText = `Time left: ${time}`;
	if (time === 0){
		time = 10;
		mainDiv.style.display = 'none';
		gameOverEl.style.display = 'inline';
		finalScore.innerText = `Your final score is: ${score}`;
	}
}

function chooseWord(){
	var indexRandom = Math.floor(Math.random() * words.length);
	word.innerText = words[indexRandom];
}
function updateScore(){
	score++;
	scoreEl.innerHTML = `Score: ${score}`;
}
function reloadGame(){
	gameOverEl.style.display = 'none';
	mainDiv.style.display = 'inline';
	score = 0;
	time = 11;
	scoreEl.innerText = `Score: ${score}`;
	input.value = '';
	chooseWord();
	updateTime();
}
input.addEventListener('input', function(e){
	var insertedText = e.target.value;
	if (insertedText === word.innerText){
		if (difficulty === 'Hard'){
			time+=2;
		}
		else if(difficulty === 'Medium'){
			time+=3;
		}
		else{
			time+=5;
		}
		chooseWord();
		input.value = '';
		updateScore();
	}
})
reloadBtn.addEventListener('click', reloadGame);

difficultyEl.addEventListener('change', function(){
	difficulty = difficultyEl.value;
	reloadGame();
});







