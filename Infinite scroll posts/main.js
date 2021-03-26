var input = document.getElementById('input');
var loader = document.getElementById('loader');
var posts = document.getElementById('posts');
var number = document.getElementById('number');
var heading = document.getElementById('heading');
var postBody = document.getElementById('post-body');

let limit = 5;
let page = 1;

getData();

function displayPosts(data){
	console.log(data);
	for (var i=0; i<data.length; i++){
		var post = document.createElement('div');
		post.classList.add('post');
		post.innerHTML = `<p class="number">${data[i].id}</p>
						<p class="heading" id="heading">${data[i].title}</p>
						<p class="post-body" id="post-body">${data[i].body}</p>`;
		posts.appendChild(post);
	}
}

function getData(){
	fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
	.then(res=>res.json())
	.then(data=> 
		displayPosts(data));
}

function showLoading(){
	loader.classList.add('show');
	setTimeout(function(){
		loader.classList.remove('show');
		setTimeout(function(){
			page++;
			getData();
		}, 500)
	}, 1200);
}
function filterPosts(e){
	var term = e.target.value.toUpperCase();
	var posts = document.querySelectorAll('.post');
	posts.forEach(post=>{
		var title = post.querySelector('.heading').innerText.toUpperCase();
		var body = post.querySelector('.post-body').innerText.toUpperCase();
		console.log(post);
		if ((title.includes(term)===true) || (body.includes(term)===true)){
			post.style.display = "flex";
		}
		else{
			post.style.display = "none";
		}
	})
}

window.addEventListener('scroll', function(){
	const scrollTop = document.documentElement.scrollTop;
	const scrollHeight = document.documentElement.scrollHeight;
	const clientHeight = document.documentElement.clientHeight;

	if (scrollTop+clientHeight >= scrollHeight - 5){
		showLoading();
	}

})
input.addEventListener('input', filterPosts);





