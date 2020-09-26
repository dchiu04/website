let foo = new Array(45);//create a 45 element array

let alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
'V', 'W', 'X', 'Y', 'Z'];


function generateButtons() {
	let num = prompt("Enter a number of buttons to be created (0-26)");
	if (num < 0 || num > 26 || isNaN(num)) {
		alert("Has to be a number between 0 to 26");
		generateButtons();
	}
	
	for (let i=0; i < num;i++){
		let btn = document.createElement('button');
		btn.innerHTML = alpha[i];
		document.body.appendChild(btn);
		btn.setAttribute("style", "margin-right: 10px; width: 50px; height: 25px; font-weight: bold");
		btn.addEventListener("click", function(){
		console.log("Button " + alpha[i] + " was clicked");}) 
	}
	document.write("</br></br>");
}

function Recipe(title, servings, ingredients) {
    this.title = title;
	this.servings = servings;
	this.ingredients = ingredients;
	
	this.print = function() {
		document.write("Title: " + title + "</br></br>");
		document.write("Serves: " + servings + "</br></br>");
		document.write("Ingredients: " + "</br></br>");
		
		for(let i = 0; i < ingredients.length; i++){
			document.write(ingredients[i] + "</br></br>");
		}
	};
}

generateButtons();
let myObj = new Recipe("Chicken Cacciatore", 2, ["cinnamon", "lettuce", "onion"]);
myObj.print();
