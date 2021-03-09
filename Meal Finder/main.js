var input = document.getElementById('input');
var searchBtn = document.getElementById('search');
var randomBtn = document.getElementById('random');
var singleMeal = document.getElementById('single-meal');
var resultHeading = document.getElementById('result-heading');
var mealsEl = document.getElementById('meals');
var random = document.getElementById('random');


function displayMeal(){
	if (input.value === ''){
		alert('Please add a meal name');
	}
	else{
		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
			.then(res=>res.json())
			.then(data=>{
				resultHeading.innerHTML = `<h2>Search results for '${input.value}':</h2>`;
				if (data.meals===null){
					resultHeading.innerHTML = `There are no such result. Try again!`
				}
				else{
					mealsEl.innerHTML = data.meals.map(meal=>
						`<div class="meal">
							<img src="${meal.strMealThumb}" />
							<div class="meal-info" data-mealID="${meal.idMeal}">
								<h3>${meal.strMeal}</h3>
							</div>
						</div>`
					).join('');
					input.value = '';
				}
			})
	}
}

function createIngredients(meal){
	var ingredients = [];
	for (var i=1; i <= 20; i++){
		if (meal[`strIngredient${i}`] !== null && meal[`strIngredient${i}`]!=="") {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
		}
		else{
			break;
		}
	}
	return ingredients;
}

function getMealById(mealId){
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
		.then(res=>res.json())
		.then(data=>{
			var ingredients = createIngredients(data.meals[0]);
			singleMeal.innerHTML = `
				<h2>${data.meals[0].strMeal}</h2>
				<img src="${data.meals[0].strMealThumb}" />
				<div class="single-meal-info">
					<p>${data.meals[0].strCategory}</p>
					<p>${data.meals[0].strArea}</p>
				</div>
				<div>
					<p>${data.meals[0].strInstructions}</p>
				</div>
				<h2>Ingredients</h2>
				<div class="ingredients">
					${ingredients.map(ing=>`<p>${ing}</p>`).join('')}
				</div>
			`;
		})
}
function showRandomMeal(){
	mealsEl.innerHTML = '';
	resultHeading.innerHTML = '';
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res=>res.json())
		.then(data=>{
			var ingredients = createIngredients(data.meals[0]);
			singleMeal.innerHTML = `
				<h2>${data.meals[0].strMeal}</h2>
				<img src="${data.meals[0].strMealThumb}" />
				<div class="single-meal-info">
					<p>${data.meals[0].strCategory}</p>
					<p>${data.meals[0].strArea}</p>
				</div>
				<div>
					<p>${data.meals[0].strInstructions}</p>
				</div>
				<h2>Ingredients</h2>
				<div class="ingredients">
					${ingredients.map(ing=>`<p>${ing}</p>`).join('')}
				</div>
			`;
		})

}
searchBtn.addEventListener('click', displayMeal);
mealsEl.addEventListener('click', function(event){
	if (event.target.className === "meal-info"){
		var mealInfo = event.target;
	}
	else{
		var mealInfo = event.target.parentElement;
	}
	var mealId = mealInfo.getAttribute("data-mealID");
	getMealById(mealId);
});
randomBtn.addEventListener('click', showRandomMeal);




