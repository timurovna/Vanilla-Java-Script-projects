// 1. craete vars - done
// 2. add event listener on container click -done
// 3. select movie - done
// 4. seats change color and update price and number - done
// 5. save to local storage
// 6. get from local storage and show updated info

var container = document.querySelector('.container-seats');
var seats = document.querySelectorAll('.row .seat:not(.occupied)');
var count = document.getElementById('count');
var total = document.getElementById('total');
var movie = document.getElementById('movies');
var moviePrice = movie.value;

populateUI();

function populateUI(){
	function changeToSelected(seat, index){
		if (selectedSeats.indexOf(index) > -1){
			seat.classList.add('selected');
		}
	}
	var selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	if (selectedSeats!==null && selectedSeats.length > 0){
		seats.forEach(changeToSelected);
	}
	var selectedMovie = localStorage.getItem('movieIndex');
	if (selectedMovie!==null){
		movie.selectedIndex = selectedMovie;
	}
}

function updateTicketInfo(){
	var selectedSeats = document.querySelectorAll('.row .selected');
	count.innerHTML = selectedSeats.length;
	total.innerHTML = moviePrice * selectedSeats.length;

	var selectedSeatsArr = Array.from(selectedSeats);
	var seatsArr = Array.from(seats);

	var seatsIndex = selectedSeatsArr.map(getIndex);

	function getIndex(seat){
		return [...seats].indexOf(seat);
	}
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

movie.addEventListener('change', function(event){
	moviePrice = +event.target.value;
	localStorage.setItem('movieIndex', event.target.selectedIndex);
	localStorage.setItem('moviePrice', event.target.value);
	updateTicketInfo();
});

container.addEventListener('click', function(event){
	if ((event.target.classList.contains('seat') === true) && (event.target.classList.contains('occupied')===false)) {
		event.target.classList.toggle('selected');
	}
	updateTicketInfo();
});

