var containerEl = document.getElementById('container');
var progressEl = document.getElementById('progress');
var progressContainer = document.getElementById('progress-container');
var btnPrev = document.getElementById('prev');
var btnNext = document.getElementById('next');
var btnPlay = document.getElementById('play');
var cover = document.getElementById('cover');
var audio = document.getElementById('audio');
var title = document.getElementById('title');


var songs = ['hey', 'summer', 'ukulele'];
var songInd = 1;

loadSong(songs[songInd]);

function loadSong(song){
	title.innerHTML = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

function playSong(){
	containerEl.classList.add('play');
	btnPlay.innerHTML = `<i class="fas fa-pause"></i>`;
	audio.play();
}
function pauseSong(){
	containerEl.classList.remove('play');
	btnPlay.innerHTML = `<i class="fas fa-play"></i>`;
	audio.pause();
}
function nextSong(){
	if (songInd === songs.length-1){
		loadSong(songs[0]);
		playSong();
		songInd = 0;
	}
	else{
		loadSong(songs[songInd+1]);
		playSong();
		songInd++;
	}
}
function prevSong(){
	if (songInd!==0){
		loadSong(songs[songInd-1]);
		playSong();
		songInd--;
	}
}
function updateProgress(e){
	var progressPercent = (e.srcElement.currentTime/e.srcElement.duration)*100;
	console.log(progressPercent);
	progressEl.style.width = `${progressPercent}%`;
}

function setProgress(e){
	var width = this.clientWidth;
	var clickX = e.offsetX;
	audio.currentTime = (clickX/width)*audio.duration;

}

btnPlay.addEventListener('click', function(){
	if (containerEl.classList.contains('play')){
		pauseSong();
	}
	else{
		playSong();
	}
});
btnNext.addEventListener('click', nextSong);
btnPrev.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);




