//user score
let score = 0;

//max row and col size is 5
let row = 0;
let col = 0;

//row, col at 0 is 4 tiles
let len = ((row + 2) * (col + 2));

//number of correct tiles, starts at 2
let num = 2;

//holds values of each tile (true = correct, false = incorrect)
let newArr = [];

//used to flash the grid
let copyArr = [];


//default 90
let degrees = 90;

//determines next round (increase/decrease)
let clickedOnWrongTile = false;

//start game when document loads
document.body.onload = startGame(row, col, score);

//Generates a visual grid
function generateGrid(row, col, degrees) {
	//first pass is 2x2 when row, col is 0
	for(let i = 0; i < row+2; i++) {
		let rows = document.createElement('div');
			rows.setAttribute('class', 'row');
		for(let j = 0; j < col+2; j++) {
			let grid = document.getElementById('grid').appendChild(rows); 
			let block = document.createElement('div');
			rows.setAttribute('class', 'row');
			block.setAttribute('class', 'square');
			block.setAttribute('id', `Row${i}Col${j}`);
			rows.appendChild(block);
		}
	}
	
	//rotate grid after 1 second
	setTimeout(() => {
		// IE9
		document.getElementById("grid").style.msTransform = 'rotate('+degrees+'deg)'; 
		// standard
		document.getElementById("grid").style.transform = 'rotate('+degrees+'deg)'; 	
		
		var childDivs = document.getElementById("grid").getElementsByClassName('square');
		
		//change color of everything in grid back to pink after rotating
		for( i = 0; i< childDivs.length; i++ ) {
			let childDiv = childDivs[i];
			childDiv.style.background = "pink";
		}
	}, 1000);
}

//Flashes animation of all correct and incorrect tiles
function flashGrid(copyArr) {
	//flashes for 2 seconds
	setTimeout(() => {
		console.log("should be flashing");
		// IE9
	//	$('#grid').delay(100).fadeOut().fadeIn('slow')
		// standard	
		
		var childDivs = document.getElementById("grid").getElementsByClassName('square');
		
		//change color of everything in grid back to pink after rotating
		for( i = 0; i< copyArr.length; i++ ) {
			let childDiv = childDivs[i];
			if (childDiv[i]) {
				childDiv.style.background = "aqua";
			} else {
				childDiv.style.background = "pink";
			}
		}
	}, 1000);
}
//determines right/wrong for each tile
function generateTiles(row, col, num, len) {
	
	//reset back to empty
	let tiles = [];
	
	//recalculates total length of new grid
	len = (row + 2) * (col + 2);

	//number of correct tiles is based on length of grid
	num = Math.floor(len / 3);
	
	//initial starts at 2
	if(row == 0 && col == 0) {
		num = 2;
	}
	
	//sets all to false
	for(let i = 0; i < len; i++) {
			tiles[i] = false;
	}
	
	let choice = 0;
	
	//assigns trues to random indexes from index 0 to len, "num" number of times
	while (num > 0) {
		//return a random index
		choice = Math.floor(Math.random() * len);
		
		//redo random number generation
		if(tiles[choice] == true) {
			choice = Math.floor(Math.random() * len);
		}
		else{
			tiles[choice] = true;
			num--;
		}
	}
	
	
	newArr = [];
	let c = col;
	
	//change tiles into a 2d array
	while(tiles.length) 
		newArr.push(tiles.splice(0, c + 2));
	
	return newArr;
}

//shows user the summary page after confirmation
function terminate() {
	var r = confirm("Are you sure you want to terminate the game?");
	if(r) {
		//send user to summary page
		location.href = "summary.html";
	}
}

//forces termination of the game
function autoTerminate() {
	location.href = "summary.html";
}

//removes everything inside of grid
function removeGrid() {
	var g = document.getElementById('grid');
	g.querySelectorAll('*').forEach(x => x.remove());
}

//sets colors to correct tiles
function setCorrectTiles(row, col, newArr) {
	
	for(let r = 0; r < row+2; r++) {
		for(let c = 0; c < col+2; c++) {
			//set correct tiles when true
			if(newArr[r][c]) {
				let change = document.getElementById(`Row${r}Col${c}`);
				change.style.background = "aqua";
				setTimeout(() => {
					change = document.getElementById(`Row${r}Col${c}`);					
					change.style.background = "pink";
				}, 1000);
			}
		}
	}
}

//plays sound effect when refreshing grid
function playAudio() {
	let m = document.getElementById("sound");
	m.play();
	m.muted = false;
}

//stores all of the game logic
function startGame(row, col, score) {
	//update score
	let s = document.getElementById('score');
	s.innerHTML = `Score: ${score}`;
	localStorage.setItem("score", score);
	
	//end game
	if(score < 0) {
		autoTerminate();
		return;
	}
	
	//initial
	if (score == 0 && !clickedOnWrongTile) {
		//gen new grid
		generateGrid(row, col, degrees);

		//holds array with true/false's
		newArr = generateTiles(row, col, num, len);

		copyArr = newArr;
		
		//set functionality and color of correct tiles
		setCorrectTiles(row, col, newArr);
	}
	
	//repeat first round
	if(clickedOnWrongTile && row == 0 && col == 0) {
		//flashGrid();
		playAudio();
		//removing grid not working
		removeGrid();
		
		generateGrid(row, col, degrees+90);
		degrees += 90;
		
		//holds array with true/false's
		newArr = generateTiles(row, col, num, len);
		copyArr = newArr;
		clickedOnWrongTile = false;	
		//set functionality and color of correct tiles
		setCorrectTiles(row, col, newArr);
	}
	
	//go back a round, row or col needs to go back to the previous one
	if(clickedOnWrongTile && (row > 0 || col > 0)) {
		//flashGrid();
		playAudio();
		removeGrid();

		row--;
		col --;
		
		generateGrid(row, col, degrees+90);
		degrees += 90;
		
		//holds array with true/false's
		newArr = generateTiles(row, col, num, len);
		copyArr = newArr;
		clickedOnWrongTile = false;
		//set functionality and color of correct tiles
		setCorrectTiles(row, col, newArr);
	}
	
	//count the number of correct tiles left unclicked
	let truesRemaining = 0;
	for(let r = 0; r < row+2; r++) {
		for(let c = 0; c < col+2; c++) {
			if(newArr[r][c]) {
				truesRemaining++;
			}
		}
	}
	
	//got everything correct, move on to next stage
	if (truesRemaining == 0 && !clickedOnWrongTile) {
	//	flashGrid();
		playAudio();
		
		//remove grid elements
		removeGrid();
		
		col++;
		row++;
		generateGrid(row, col, degrees+90);
		degrees += 90;
		
		//holds array with true/false's
		newArr = generateTiles(row, col, num, len);
		copyArr = newArr;

		//set functionality and color of correct tiles
		setCorrectTiles(row, col, newArr);
	}
	
	//assign onclick and color to corresponding tiles
	for(let r = 0; r < row+2; r++) {
		for(let c = 0; c < col+2; c++) {
			
			//set correct tiles
			if(newArr[r][c] == true) {
				
				change = document.getElementById(`Row${r}Col${c}`);	
		
				change.onclick = function(event) {
					change = document.getElementById(`Row${r}Col${c}`);

					change.style.background = "aqua";
					
					//stop user from clicking on it repeatedly
					newArr[r][c] = false;
					startGame(row, col, score+1);
				}
				
			//set wrong tiles
			} else {
				wrongTiles = document.getElementById(`Row${r}Col${c}`);
				wrongTiles.onclick = function(event) {
					if(change.style.background == "pink") {
						clickedOnWrongTile = true;
						startGame(row, col, score-1);
					}
				}
			}				
		}		
	}
}
/** to dos:
- flash animation on whole grid on refresh
- flash all tiles (correct and falses) after remainingTiles = 0
*/