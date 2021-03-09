var balance = document.getElementById('balance');
var income = document.getElementById('money-plus');
var expense = document.getElementById('money-minus');
var inputText = document.getElementById('text');
var inputAmount = document.getElementById('amount');
var addBtn = document.getElementById('btn');
var his = document.getElementById('history');
var deleteTransactionBtn = document.getElementById('del');
var transaction = document.getElementById('transaction');



function updateMoney(){
	if (inputAmount.value > 0){
		var incomeNum = +income.innerHTML.slice(2);
		income.innerHTML = `+$${(incomeNum + (+inputAmount.value)).toFixed(2)}`;
	}
	else{
		var expenseNum = +expense.innerHTML.slice(2);
		expense.innerHTML = `-$${(expenseNum - (+inputAmount.value)).toFixed(2)}`;
	}
	var balanceNum = +balance.innerHTML.slice(1);
	balance.innerHTML = `$${balanceNum + (+inputAmount.value)}`;
}

function removeMoney(element){
	var balanceNum = +balance.innerHTML.slice(1);
	if(element.className === "transaction green"){
		var incomeNum = +income.innerHTML.slice(2);
		income.innerHTML = `+$${(incomeNum - (+element.childNodes[4].innerHTML)).toFixed(2)}`;
		balance.innerHTML = `$${balanceNum - (+element.childNodes[4].innerHTML)}`;
	}
	else{
		var expenseNum = +expense.innerHTML.slice(2);
		expense.innerHTML = `-$${(expenseNum + (+element.childNodes[4].innerHTML)).toFixed(2)}`;
		balance.innerHTML = `$${balanceNum - (+element.childNodes[4].innerHTML)}`;
	}
}


function addTransaction(){
	if (inputText.value ==='' || inputAmount.value ===''){
		alert('Please enter text and amount!')
	}
	else{
		var element = document.createElement('div');
		if (inputAmount.value > 0){
			element.classList.add("transaction");
			element.classList.add("green");
		}
		else{
			element.classList.add("transaction");
			element.classList.add("red");
		}
		element.innerHTML = `<div class="delete" id="del">
								<p>X</p>
							</div>
							<p>${inputText.value}</p>
							<p>${inputAmount.value}</p>`;
		his.appendChild(element);
		updateMoney();
		inputText.value = '';
		inputAmount.value = '';
	}
}


addBtn.addEventListener('click', addTransaction);
his.addEventListener('click', function(event){
	transactionRemove = event.target.parentElement.parentElement;
	transactionRemove.remove();
	removeMoney(transactionRemove);
});

