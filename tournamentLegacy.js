var connect = require ('./connect.js');
var mysql  = require('mysql');
var host = connect.host;
var user = connect.user;
var password = connect.password;
var database = connect.database;
var express = require('express');
var connection = mysql.createConnection({
  host:host, user:user, password:password, database:database
});

var app = express()
app.use(express.bodyParser())

app.get('/',function(req, res) {
  res.send('Wrong')
})

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

app.listen(2801);
