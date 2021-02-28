var inputText = document.getElementById('input');
var addButton = document.getElementById('add-button');
var listItem = document.getElementById('item');
var list = document.getElementById('list');


function addNewItem(){
	if (inputText.value !== ''){
		var element = document.createElement('div');
		element.classList.add("item");
		element.innerHTML = `<p class="item-text">${inputText.value}</p><h4 class="remove" id='remove'>X</h4>`;
		list.appendChild(element);
		inputText.value = '';
	}
}

addButton.addEventListener('click', addNewItem);
inputText.addEventListener('keydown', function(event){
	if (event.keyCode===13){
		addNewItem();
	}
});
list.addEventListener('click', function(event){
	if (event.target.parentElement.className === "item" || event.target.parentElement.className === "item done" || event.target.parentElement.className === "item done crossed"){
		event.target.parentElement.remove();
	}
	else{
		event.target.classList.add("done");
		event.target.classList.add("crossed");
	}
});


