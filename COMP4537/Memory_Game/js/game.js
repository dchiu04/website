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

//determines if the game should increase rows or cols
let tilesIncreaseBool = true;

//start game when document loads
document.body.onload = startGame(row, col, score, num);

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

//determines logic for each tile
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
	let num = 0;
	for(let r = 0; r < row+2; r++) {
		for(let c = 0; c < col+2; c++) {
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
function startGame(row, col, score, num) {

	//update score and initially, moves
	let s = document.getElementById('score');
	s.innerHTML = `Score: ${score}`;
    localStorage.setItem("score", score);
    let n = document.getElementById('moves');
    n.innerHTML = `Moves: ${num}`;

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

		//set functionality and color of correct tiles
        num = setCorrectTiles(row, col, newArr);
        copyArr = newArr;
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
   
	//repeat first round
	if(clickedOnWrongTile && row == 0 && col == 0 && num == 0) {
		playRefreshAudio();
		removeGrid();
		
		generateGrid(row, col, degrees+90);
		degrees += 90;
		
		//holds array with true/false's
        newArr = generateTiles(row, col, num, len);
      
        tilesIncreaseBool = false;
        clickedOnWrongTile = false;	
        
		//set functionality and color of correct tiles
        num = setCorrectTiles(row, col, newArr);
    
        let n = document.getElementById('moves');
        n.innerHTML = `Moves: ${num}`;
	}
	
	//go back a round, row or col needs to go back to the previous one
	if(clickedOnWrongTile && (row > 0 || col > 0) && num == 0) {
		playRefreshAudio();
		removeGrid();

		//remove a row
		if (row > col && row >= 1) {
			row--;
		
		//remove a col
		} else if (col > row && col >= 1) {
			col --;
		
		//remove a row if they're equal and not 0
		} else if (row == col && row >= 1 && col >= 1){
			row--;
		}
		
		generateGrid(row, col, degrees+90);
		degrees += 90;
		
		//holds array with true/false's
        newArr = generateTiles(row, col, num, len);

        clickedOnWrongTile = false;
        
		//set functionality and color of correct tiles
        num = setCorrectTiles(row, col, newArr);

        let n = document.getElementById('moves');
        n.innerHTML = `Moves: ${num}`;  
	}	

	//got everything correct, move on to next stage
	if (truesRemaining == 0 && !clickedOnWrongTile && num == 0) {
       // flashGrid(row, col, copyArr);
		playRefreshAudio();
        removeGrid();
        
        //increase cols
        if (tilesIncreaseBool) {
                
            col++;
            generateGrid(row, col, degrees+90);
            degrees += 90;
            
            //holds array with true/false's
            newArr = generateTiles(row, col, num, len);
            tilesIncreaseBool = false;
            
        }
        //increase row
        else if (!tilesIncreaseBool) {
            
            row++;
            generateGrid(row, col, degrees+90);
            degrees += 90;
            
            //holds array with true/false's
            newArr = generateTiles(row, col, num, len);
      
            tilesIncreaseBool = true;
        }
        //set functionality and color of correct tiles
        num = setCorrectTiles(row, col, newArr);
        let n = document.getElementById('moves');
        n.innerHTML = `Moves: ${num}`;
    }
	
	//assign onclick and color to corresponding tiles
	for(let r = 0; r < row+2; r++) {
		for(let c = 0; c < col+2; c++) {
			
			//set correct tiles
			if(newArr[r][c] == true) {
				
				change = document.getElementById(`Row${r}Col${c}`);	
		
				change.onclick = function(event) {
                    playClickAudio();
					change = document.getElementById(`Row${r}Col${c}`);
					change.style.background = "aqua";
					//stop user from clicking on it repeatedly for points
					newArr[r][c] = false;
					startGame(row, col, score+1, num-1);
				}
				
			//set wrong tiles
			} else {
             
                change = document.getElementById(`Row${r}Col${c}`);
                change.onclick = function(event) {
                    playClickAudio();
                    clickedOnWrongTile = true;
                    startGame(row, col, score-1, num-1);
				}
			}				
		}		
    }
}
