window.onload = genLeaderBoard;

//Generates the leaderboard
function genLeaderBoard() {

    //retrieves score and name
	let score = localStorage.getItem("score");
	let name = localStorage.getItem("name");

	//crashes if score is undefined
	if(score === undefined || !name ) {
		location.href="./index.html"
		return
	}

	let url = "https://wicked-spider-23736.herokuapp.com/submitScore";
	let data = {"name":name, "score":score}

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.text())
    .then(data => {
        fetch("https://wicked-spider-23736.herokuapp.com/get_leaderboard")
        .then(response => response.json())
        .then(data => { //data is array of objects

            //convert array of objects into just an array
            const objectToValuesPolyfill = (data) => {
            return Object.keys(data).map(key => data[key]);
            };

            Object.values = Object.values || objectToValuesPolyfill;

            var array = Object.values(data);

            let board = document.getElementById("board");

            //header
            let b = "<tr><th>Rank</th><th>Name</th><th>Score</th>";

            //top 5 players and table formatting
            for(let i = 0; i < 5; i++) {
                b += "<tr>"
                b += "<td>" + (i+1) + "</td>"
                b += "<td>" + array[0][i].name + "</td>" //name
                b += "<td>" + array[0][i].score + "</td></tr>" //score
                b += "</tr>"
            }

            let rank = 0;
            let found = false;

            //getting user rank
            for(let i = 0; i < array[0].length; i++) {
                //find first instance of same name and score
                if(!found && array[0][i].name == name && array[0][i].score == score) {
                    rank = i+1;
                    found = true;
                }
            }

            board.innerHTML = b;
            document.getElemeny
            document.getElementById("user").innerHTML =  "Name: " + name + "<br>" + "Rank: " + rank + "<br>" + "Score: " + score;
        })
    })
};
