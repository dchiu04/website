window.onload = genLeaderBoard;

function genLeaderBoard() {
	let score = localStorage.getItem("score");
	
	let name = localStorage.getItem("name");

	//crashes if score is undefined
	if(score === undefined || !name ) {
		location.href="./index.html"
		return
	}

	let url = "https://wicked-spider-23736.herokuapp.com/submitScore";
	let data = {"name":name, "score":score}
	console.log("name: " + name);
	console.log("score: " + score);
	// Example POST method implementation:
	// Default options are marked with *
	fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		body: JSON.stringify(data) // body data type must match "Content-Type" header
		})
		.then(response => response.text())
		.then(data => {
			document.getElementById("user").innerHTML = name + "<br>" + "Score: " + score;
			fetch("https://wicked-spider-23736.herokuapp.com/get_leaderboard")
			.then(response => response.json())
			.then(data => { //data is array of leaderboard
				//console.log(data);

				const objectToValuesPolyfill = (data) => {
					return Object.keys(data).map(key => data[key]);
				};

				  Object.values = Object.values || objectToValuesPolyfill;

				var array = Object.values(data);
				console.log(array[0][1].name);

				let board = document.getElementById("board");

				//header
				let b = "<tr><th>Rank</th><th>Name</th><th>Score</th>";
				
				//top 5 players
				for(let i = 0; i < 5; i++) {
					b += "<tr>"
					b += "<td>" + (i+1) + "</td>"
					b += "<td>" + array[0][i].name + "</td>" //name
					b += "<td>" + array[0][i].score + "</td></tr>" //score
					b += "</tr>"
				}
				board.innerHTML = b;
			})
			
		})
	};



