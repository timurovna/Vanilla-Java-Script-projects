var currency1 = document.getElementById('currency1');
var currency2 = document.getElementById('currency2');
var currency1Amount = document.getElementById('currency1-amount');
var currency2Amount = document.getElementById('currency2-amount');
var result = document.getElementById('result');
var swap = document.getElementById('swap');


function calculate(){
	var currencyOne = currency1.value;
	var currencyTwo = currency2.value;
	fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
		.then(res=>res.json())
		.then(data=>{;
			var rate = data.rates[currencyTwo];
			result.innerHTML = `1 ${currencyOne} = ${rate}${currencyTwo}`;
			currency2Amount.value = rate * currency1Amount.value;
		});
};

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
