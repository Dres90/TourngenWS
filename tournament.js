/*
Web Services for interaction with Tournaments
Requires NodeJS
Andres Cardenas
28/02/2014
*/

//Import necessary modules
var connect = require ('./connect.js');
var mysql  = require('mysql');
var express = require('express');
var https = require('https');

//Create connection to mysql database
var connection = mysql.createConnection({
  host:connect.host, 
  user:connect.user, 
  password:connect.password, 
  database:connect.database
});


var app = express();
app.use(express.bodyParser());

app.get('/Tournament/', function(req, res, next) {
	connection.query('SELECT * from Tournament', function(err, rows, fields) {
  if (err) throw err;
  var jsonString = JSON.stringify(rows);
  res.send(jsonString);
});
});

app.get('/Tournament/:id', function(req, res, next) {
	connection.query('SELECT * from Tournament where Tournament_id = ' + connection.escape(req.params.id), function(err, rows, fields) {
  if (err) throw err;
  var jsonString = JSON.stringify(rows);
  res.send(jsonString);
});
});


https.createServer(connect.certificate,app).listen(2800);
