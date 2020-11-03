//user score
let score = 0;
//max row and col size is 5
let row = 0;
let col = 0;
//row, col at 0 is 2x2 tiles
let len = ((row + 2) * (col + 2));
//number of correct tiles, starts at 2
let num = 2;
//holds values of each tile (true = correct, false = incorrect)
let newArr = [];
//default 90
let degrees = 90;
//determines next round (increase/decrease)
let clickedOnWrongTile = false;
//determines if the game should increase rows or cols
let tilesIncreaseBool = true;
//stops users from being able to click on tiles before it finishes rotating
let afterRotate = false;
//shows end tiles with correct/incorrects
let copyArr = [];

//start game when document loads
document.body.onload = startGame();

//Generates a visual grid
function generateGrid() {
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
}

//rotates grid and sets to pink
function rotate() {
		document.getElementById("grid").style.msTransform = 'rotate('+degrees+'deg)'; 
		document.getElementById("grid").style.transform = 'rotate('+degrees+'deg)'; 	
		var childDivs = document.getElementById("grid").getElementsByClassName('square');
		
		//change color of everything in grid back to pink after rotating
		for( i = 0; i< childDivs.length; i++ ) {
			let childDiv = childDivs[i];
			childDiv.style.background = "pink";
		} 
	return true;
}

//determines logic for each tile
function generateTiles() {
	let tiles = [];
	
	//recalculates total length of new grid
	len = (row + 2) * (col + 2);
	//number of correct tiles is based on length of grid
	num = Math.floor(len / 3);
	
	//initial starts at 2
	if(row == 0 && col == 0) {
		num = 2;
	}
    count = num;
    
	//sets all to false
	for(let i = 0; i < len; i++) {
			tiles[i] = false;
	}
	
	let choice = 0;
	
	//assigns trues to random indexes from index 0 to len, "num" number of times
	while (count > 0) {
		//return a random index
		choice = Math.floor(Math.random() * len);
		
		//redo random number generation
		if(tiles[choice] == true) {
			choice = Math.floor(Math.random() * len);
		}
		else{
			tiles[choice] = true;
			count--;
		}
	}
	newArr = [];
	let c = col;
	//change tiles into a 2d array
	while(tiles.length) {
		let rowToAdd = tiles.splice(0, c+2); 
		newArr.push(rowToAdd);

	}
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

//sets colors to correct tiles after 1 sec
function setCorrectTiles() {
	num = 0;
	for(let r = 0; r < newArr.length; r++) {
		for(let c = 0; c < newArr[0].length; c++) {
			//set correct tiles when true
			if(newArr[r][c]) {
                num++;
				let change = document.getElementById(`Row${r}Col${c}`);
				change.style.background = "aqua";
				setTimeout(() => {
					change = document.getElementById(`Row${r}Col${c}`);					
					change.style.background = "pink";
				}, 1000);
			}
		}
    }
    return num;
}

//plays sound effect when clicking on any tile
function playClickAudio() {
	let m = document.getElementById("sound");
	m.play();
	m.muted = false;
}

//plays sound effect when refreshing grid
function playRefreshAudio() {
	let m = document.getElementById("refresh");
	m.play();
	m.muted = false;
}

//stores all of the game logic
function startGame() {
	//update score and initially, moves
	let s = document.getElementById('score');
	s.innerHTML = `Score: ${score}`;
    localStorage.setItem("score", score);
    let n = document.getElementById('moves');
    n.innerHTML = `Moves: ${num}`;

	//show all correct/incorrect tiles
	if (num == 0) {
		showEndTiles();
	}

	//end game, no more moves and negative score
	if (score < 0 && num == 0) {
		autoTerminate();
		return;
	}
	
	//initial
	if (score == 0 && !clickedOnWrongTile) {
		//generate array logic
		newArr = generateTiles();
		//gen new grid
		generateGrid();
		
		copyArr = [];
		for(let i = 0; i < newArr.length; i++) {
			copyArr.push([]);
			for(let j = 0; j < newArr[0].length; j++) {
				copyArr[i].push(newArr[i][j]);
			}
		}

		//shows user the right/wrong tiles
		num = setCorrectTiles();
		disableOnclick();

		//only let user click on anything after 1 rotation
		setTimeout(() => {
			afterRotate = rotate();
			setTimeout(() => {
				setFunctionality(newArr);
			}, 750)
		}, 1000);
    }
   
	//repeat first round, only to make sure row/col doesnt decrease past 2
	if (clickedOnWrongTile && (row == 0 && col == 0) && num == 0) {
		afterRotate = false;

		//holds array with true/false's
		newArr = generateTiles();
		copyArr = [];
		for(let i = 0; i < newArr.length; i++) {
			copyArr.push([]);
			for(let j = 0; j < newArr[0].length; j++) {
				copyArr[i].push(newArr[i][j]);
			}
		}

		//used to increase either row/col
		tilesIncreaseBool = false;
		//user hasnt clicked on a wrong tile yet at this point
		clickedOnWrongTile = false;	
		disableOnclick();

		setTimeout(() => {
			//refresh game
			removeGrid();
			degrees += 90;
			generateGrid();
			playRefreshAudio();

			//shows user the correct/incorrect tiles
			num = setCorrectTiles();

			let n = document.getElementById('moves');
			n.innerHTML = `Moves: ${num}`;
			
			//set functionality after rotate
			setTimeout(() => {
				afterRotate = rotate();
				setFunctionality(newArr);
			}, 1000);
		}, 1000);
	}
	
	//go back a round, row or col needs to go back to the previous one
	if(clickedOnWrongTile && (row > 0 || col > 0) && num == 0) {
		afterRotate = false;
		//used to increase either row/col
		tilesIncreaseBool = false;
		//user hasnt clicked on a wrong tile yet at this point
		clickedOnWrongTile = false;	
		disableOnclick();

		if (row >= col && row >= 1) {
			row--;
		
		//remove a col
		} else if (col > row && col >= 1) {
			col--;
		}

		//holds array with true/false's
		newArr = generateTiles();
		copyArr = [];
		for(let i = 0; i < newArr.length; i++) {
			copyArr.push([]);
			for(let j = 0; j < newArr[0].length; j++) {
				copyArr[i].push(newArr[i][j]);
			}
		}

		setTimeout(() => {
			removeGrid();
			playRefreshAudio();
			//remove a row
		
			degrees += 90;
			generateGrid();
		
			//set functionality and color of correct tiles
			num = setCorrectTiles();
		
			let n = document.getElementById('moves');
			n.innerHTML = `Moves: ${num}`;
			
			//set functionality after rotate
			setTimeout(() => {
				afterRotate = rotate();
				setFunctionality(newArr);
			}, 1000);
		}, 1000);
	}	

	//got everything correct, move on to next stage
	if (!clickedOnWrongTile && num == 0) {
		afterRotate = false;
		clickedOnWrongTile = false;

		disableOnclick();

		//can't be more than 7x7 with offset = 5
		if(row <= 5 && col <= 5) {
			if (tilesIncreaseBool) {
				col++;
				tilesIncreaseBool = false;
			} else {
				row++;
				tilesIncreaseBool = true;
			}
		}

		newArr = generateTiles();
		copyArr = [];
		for(let i = 0; i < newArr.length; i++) {
			copyArr.push([]);
			for(let j = 0; j < newArr[0].length; j++) {
				copyArr[i].push(newArr[i][j]);
			}
		}
		setTimeout(() => {
			playRefreshAudio();
			removeGrid();
			
			degrees += 90;
			
			generateGrid();

			//Show user correct/incorrect tiles
			num = setCorrectTiles();

			let n = document.getElementById('moves');
			n.innerHTML = `Moves: ${num}`;
			
			//set functionality after rotate
			setTimeout(() => {
				setFunctionality(newArr);
				afterRotate = rotate();
			}, 1000);	
		}, 1000);
	}

	disableOnclick();
	//stops users from being able to click on tiles instantly
	if(afterRotate) {
		//assign onclick and color to corresponding tiles
		for(let r = 0; r < newArr.length; r++) {
			for(let c = 0; c < newArr[0].length; c++) {
				
				//set correct tiles
				if(newArr[r][c] == true) {
					change = document.getElementById(`Row${r}Col${c}`);	
					change.onclick = function(event) {
						playClickAudio();
						change = document.getElementById(`Row${r}Col${c}`);
						change.style.background = "aqua";
						//stop user from clicking on it repeatedly for points
						newArr[r][c] = false;
						score++;
						num--;
						startGame();
					}
				//set wrong tiles
				} else {
					change = document.getElementById(`Row${r}Col${c}`);
					change.onclick = function(event) {
						playClickAudio();
						change.style.background = "red"
						clickedOnWrongTile = true;
						score--;
						num--;
						startGame();
					}
				}				
			}		
		}
	}
}

function disableOnclick() {
	//disable onclick
	Array.from(document.getElementsByClassName("square")).forEach(e => e.onclick = '');
}

//Displays all incorrect and correct tiles
function showEndTiles() {
	//assign onclick and color to corresponding tiles
	for(let r = 0; r < copyArr.length; r++) {
		for(let c = 0; c < copyArr[0].length; c++) {
			change = document.getElementById(`Row${r}Col${c}`);
			//set correct tiles
			if(copyArr[r][c] == true) {
				change.style.background = "aqua";

			//set wrong tiles
			} else {
				change.style.background = "red"
			}
		}				
	}		
}

function setFunctionality(newArr) {
	//assign onclick and color to corresponding tiles
	for(let r = 0; r < newArr.length; r++) {
		for(let c = 0; c < newArr[0].length; c++) {
			//set correct tiles
			if(newArr[r][c] == true) {
				change = document.getElementById(`Row${r}Col${c}`);	
				change.onclick = function(event) {
					playClickAudio();
					change = document.getElementById(`Row${r}Col${c}`);
					change.style.background = "aqua";
					//stop user from clicking on it repeatedly for points
					newArr[r][c] = false;
					score++;
					num--;
					startGame();
				}
			//set wrong tiles
			} else {
				change = document.getElementById(`Row${r}Col${c}`);
				change.onclick = function(event) {
					playClickAudio();
					change.style.background = "red"
					clickedOnWrongTile = true;
					score--;
					num--;
					startGame();
				}
			}				
		}		
	}
}

/**Bugs:
 * - showEndTiles is getting passed an updated copy of newArr(copyArr) when i only want copyArr to be assigned to newArr once - when newArr is created
 * - assigning color to incorrectly clicked tile does not work properly b/c it's given the updated newArr
 * - newArr is being delayed (not generated when color and onclick is clicked)
 */