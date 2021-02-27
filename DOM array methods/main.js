
var main = document.getElementById('right');
var addUserBtn = document.getElementById('addUser');
var doubleMoneyBtn = document.getElementById('doubleMoney');
var showMlnBtn = document.getElementById('mln');
var sortRichBtn = document.getElementById('richest');
var calculateWealthBtn = document.getElementById('total');

var data = [];

function getRandomUser(){
	var users = ['Vlad Vladov', 'Bill Gates', 'Luyi Lyu', 'John Smith', 'Alex Copper', 'Johnson Johnson', 'Aya Shalkar', 'Ada Love', 'Alice Stan'];
	var randomIndex = getRandomIndex(0, users.length);
	var newUser = {
		name: `${users[randomIndex]}`,
		money: Math.floor(Math.random()*1000000)
	}
	addData(newUser);
}

function getRandomIndex(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function addData(obj){
	data.push(obj);
	updateDOM(data);
}

function updateDOM(providedData = data){
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
	providedData.forEach(item=>{
		var element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
		main.appendChild(element);
	});
}
function formatMoney(number){
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
function doubleMoney(){
	data = data.map(user => {
		user.money = user.money*2
		return user;
	});
	updateDOM();
}
function sortByRichest(){
	data.sort((a, b)=>b.money-a.money);
	updateDOM();
}
function showMln(){
	data = data.filter(function(item){
		return item.money > 1000000;
	})
	updateDOM();
}
function calculateWealth(){
	var wealth = data.reduce((acc, user) => (acc += user.money), 0);
	var element = document.createElement('div');
	element.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong</h3`;
	main.appendChild(element);
}

addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortRichBtn.addEventListener('click', sortByRichest);
showMlnBtn.addEventListener('click', showMln);
calculateWealthBtn.addEventListener('click', calculateWealth);

