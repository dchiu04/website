
'use strict';
const express = require('express');
var mysql = require('mysql');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
    host: "jos-test.c4ztbtstxmqe.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Jerome2020",
    database: "Debby_Memory_Game"
});

con.connect(function(err) {
    console.log("trying to connect");
    if (err) throw err;
    console.log("Connected!");
    
    con.query("SELECT * FROM Player ORDER BY score DESC LIMIT 5", function (err, result, fields) {
    if (err) throw err;

    for(let i = 0; i < result.length; i++) {
        console.log(result[i]["name"]);
        console.log(result[i]["score"]);
    }
  });
});

let processQueryResults = (results) => {
    return JSON.parse(JSON.stringify((results[0])));
}

app.post('/submit', function(req, res) {
    const score = req.body.score;

    const data = {
        name: req.body.name,
        score: score
    }; 
})

//Returns players
app.get('/get_leaderboard', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
     
    con.query("SELECT * FROM Player Limit 5", function (err, result, fields) {
        if (err) throw err;

        for(let i = 0; i < result.length; i++) {
            console.log(result[i]["name"]);
            console.log(result[i]["score"]);
        }
      });
});


app.get('/submitScore', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    //Get score and name from summary
    let score = req.body.score;
    let name = req.body.name;

     //Insert into database
    var sql = "INSERT INTO Player (name, score) VALUES (" + con.escape(name)+ "," + con.escape(score) + ")";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
  
});

var port = 8000 || process.env.PORT

app.listen(port);

console.log(`listening on port ${port}`);



