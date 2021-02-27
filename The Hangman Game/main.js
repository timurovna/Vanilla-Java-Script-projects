var wrongLettersEl = document.getElementById('wrong-letters');
var word = document.getElementById('word');
var popup = document.getElementById('popup-container');
var notification = document.getElementById('notification');
var playBtn = document.getElementById('play-button');
var finalMessage = document.getElementById('final-message');
var figures = document.querySelectorAll('.figure-part');
var words = ['programming', 'wizard', 'literature', 'algorythm', 'interface', 'application'];
var selectedWord = words[Math.floor(Math.random() * words.length)];
var wrongLetters = [];
var correctLetters = [];
var letters = word.children;
var counter = 0;

displayLines();

function displayLines(){
	word.innerHTML = '';
	selectedWord.split('').forEach(item=>{
		var element = document.createElement('span');
		element.classList.add("letter");
		element.innerHTML = ' ';
		word.appendChild(element);
	});
}

function setCharAt(str,index,chr) {
	console.log("before", str);
    if(index > str.length-1) return str;
    var ret = str.substring(0,index) + chr + str.substring(index+1);
    console.log("after", ret);
    return ret;
}
function findInd(str, char){
	var indices=[];
	for(var i=0; i<str.length; i++){
		if (str[i]==char){
			indices.push(i);
		}
	}
	return indices;
}
function showFigures(){
	figures.forEach(function(part, index){
		if(wrongLetters.length > index){
			part.style.display = 'block';
		}
		else{
			part.style.display = 'none';
		}
	});
}
function displayFinalMessage(){
	if (correctLetters.length === selectedWord.length){
		finalMessage.innerHTML = 'Congratulations! You have won!'
		popup.style.display = 'flex';
	}
	else if(wrongLetters.length === figures.length){
		finalMessage.innerHTML = 'You lost the game :('
		popup.style.display = 'flex';
	}
}
function playAgain(){
	selectedWord = words[Math.floor(Math.random() * words.length)];
	displayLines();
	wrongLetters = [];
	wrongLettersEl.innerHTML = '';
	popup.style.display = 'none';
	showFigures();
	correctLetters = [];
}
playBtn.addEventListener('click', playAgain);
window.addEventListener('keydown', event=>{
	if (selectedWord.includes(event.key)){
		findInd(selectedWord, event.key).forEach(function(item){
			letters[item].innerHTML = event.key;
			correctLetters.push(event.key);
		});
	}
	else if(notification.style.display === 'block'){
		notification.style.display = 'none';
	}
	else if (wrongLetters.includes(event.key)){
		notification.style.display = 'block';
	}
	else{
		wrongLetters.push(event.key);
		wrongLettersEl.innerHTML = `Wrong: ${wrongLetters}`;
		showFigures();
	}
	displayFinalMessage();
});