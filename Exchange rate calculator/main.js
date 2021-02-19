var currency1 = document.getElementById('currency1');
var currency2 = document.getElementById('currency2');
var currency1Amount = document.getElementById('currency1-amount');
var currency2Amount = document.getElementById('currency2-amount');
var result = document.getElementById('result');
var swap = document.getElementById('swap');


function selectedCurrency2(){
	var usd = [1, 419.32, 73.69, 0.83];
	var kzt = [0.0024, 1, 0.18, 0.002];
	var rub = [0.014, 5.69, 1, 0.011];
	var euro = [1.21, 506.86, 89.10, 1];

	if(currency1.value === "usd"){
		return usd[currency2.selectedIndex];
	}
	else if(currency1.value === "kzt"){
		return kzt[currency2.selectedIndex];
	}
	else if(currency1.value === "rub"){
		return rub[currency2.selectedIndex];
	}
	else{
		return euro[currency2.selectedIndex];
	}
}



// 1) fetch('a.json').then(funcion(res){

// });

// 2) fetch('a.json').then(res => {

// });

// 3) function x(res) {
// 	console.log(res);
// }

// fetch('a.json').then(x);


function calculate(){
	currency2Amount.value = selectedCurrency2()*currency1Amount.value;
	var currencyTwo = selectedCurrency2();
	var currencyName1 = currency1.options[currency1.selectedIndex].text;
	var currencyName2 = currency2.options[currency2.selectedIndex].text;
	result.innerHTML = `1 ${currencyName1} = ${currencyTwo} ${currencyName2}`;
}
function doSwap(){
	var temp = currency1.value;
	currency1.value = currency2.value;
	currency2.value = temp;
	calculate();
}

currency1.addEventListener('change', calculate);
currency2.addEventListener('change', calculate);
currency1Amount.addEventListener('change', calculate);
currency2Amount.addEventListener('change', calculate)

swap.addEventListener('click', doSwap);
