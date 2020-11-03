const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next()
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

let con = mysql.createConnection({
    host: "jos-test.c4ztbtstxmqe.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Jerome2020",
    database: "Debby_Memory_Game"
});


//Returns players from database
app.get('/get_leaderboard', (req, res) => {
   res.header("Access-Control-Allow-Origin", "*");
   console.log("making query");
   con.query('SELECT * FROM Player ORDER BY score DESC', (error, results, fields) => {
   if (error) {
      res.send({'error': error});
   }
   else res.send({'results': results});
   });
});

//Submits a score
app.post('/submitScore', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
   if (!req.body) {
      return res.sendStatus(400)
   }
    //Get score and name from summary
    let score = req.body.score;
    let name = req.body.name;
   
   //Insert into database
    let sql = "INSERT INTO Player (name, score) VALUES (" + con.escape(name)+ "," + con.escape(score) + ")";
    con.query(sql, function (err, result) {
        if (err) res.send("error");
	else {
		res.send("record inserted")
	}   
    });
});

let port = process.env.PORT || 8000
app.listen(port);
