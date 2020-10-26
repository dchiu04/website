let name = localStorage.getItem("name");
console.log(name);
let score = localStorage.getItem("score");
console.log(score);


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