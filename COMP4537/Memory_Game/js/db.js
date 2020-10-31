window.onload = genLeaderBoard;

function genLeaderBoard() {
	let score = localStorage.getItem("score");
	
	let name = localStorage.getItem("name");

	
	//won't let 0 score
	if(score === undefined || !name ) {
		location.href="./index.html"
		return
	}

	let url = "https://wicked-spider-23736.herokuapp.com/submitScore";
	let data = {"name":name, "score":score}

	// Example POST method implementation:
	// Default options are marked with *
	fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		// mode: 'no-cors', // no-cors, *cors, same-origin
		// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		// credentials: 'omit', // include, *same-origin, omit
		// headers: {
		// 	'Content-Type': 'application/json'
		// 	// 'Content-Type': 'application/x-www-form-urlencoded',
		// },
		// redirect: 'follow', // manual, *follow, error
		// referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
		}).then(response => response.text()).then(data => {
			document.getElementById("user").innerHTML = name + " " + score;
			fetch("https://wicked-spider-23736.herokuapp.com/get_leaderboard")
			.then(response => response.json()).then(data => {console.log(data)}).catch(e => console.log(e))
		}).catch(e => console.log(e))
	};



function getData() {
	//req.body.name //name
	//req.body.score //score
}

/**
function fetch(name, score) {
	let req = fetch("link"),
	{
		method: 'POST',
		headers:
		{
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(
		{
			"username": name,
			"score": score.toString()
		})
	}
	.then(response => response.json())
	.then(data ->
	{
		console.log("Success:", data)
	})
	.catch((error) =>
	{
		console.error("Error:", error)
	});
	return answer;
}

//app.fetch("link")

/**
'use strict';
//const express = require('express');
var mysql = require('mysql');

//const app = express();

var con = mysql.createConnection({
    host: "sql3.freemysqlhosting.net",
    user: "sql3366017",
    password: "T5kPxgQmTA",
    database: "sql3366017",
	
});

con.connect(function(err) {
	console.log("trying to connect");
  if (err) throw err;
  console.log("Connected!");
});
*/
/**
processQueryResults = (results) => {
    return JSON.parse(JSON.stringify((results[0])));
}


app.get('/get_leaderboard', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    con.query(`CALL GetScores();`, (error, results, fields) => {
        if (error) res.send({'success': false, 'error': error});
        else res.send({'success': true, 'payload': processQueryResults(results)});
    });
});


app.get('/submit_a_score', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let score = req.query.score;
    let name = req.query.name;
    con.query(`CALL AddScoreToLeaderboard('${name}', ${score})`, (error, results, fields) => {
        if (error) res.send({'success': false, 'error': error});
        else res.send({'success': true, 'payload': processQueryResults(results)[0]});
    });
});

var port = 8000 || process.env.PORT

app.listen(port);

console.log(`listening on port ${port}`);
*/