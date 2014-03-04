/*
Web Services for Login and token creation
Requires NodeJS, Mysql and Express modules
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

//Initial configuration for Express
var app = express();
app.use(express.json());
app.use(express.urlencoded());

/*
Login GET Web Service
Receives a JSON with the username, the password and the identifier
It validates the login information
If the login is correct, it creates a token by using the crypto library
It inserts the token into the database and makes it valid for a year after creation
It also returns the token to the client
If the login is incorrect, a JSON with an incorrect status is passed to the client
*/
app.get('/Login/', function(req, res, next) {
var body = req.body;
var user = body.username;
var password = body.password;
var identifier = body.identifier;


var crypto    = require('crypto');
var now		  = new Date();	
var text      = user+identifier+now;
var key       = 'secret';
var algorithm = 'sha256';
var hash, hmac;
hmac = crypto.createHmac(algorithm, key);
hmac.setEncoding('base64');
hmac.write(text);
hmac.end();
rawhash = hmac.read();
hash = connection.escape(rawhash);
var expiring = new Date();
expiring.setDate(now.getDate()+365);
var expire = expiring.toISOString().slice(0, 19).replace('T', ' ');
connection.query('INSERT into Token VALUES ('+hash+',1,"'+expire+'")', function(err, rows, fields)
{
	 if (err) throw err;
});

res.send(hash);
});

app.post('/Login/:user/:pass', function(req, res, next) {
var user = connection.escape(req.params.user);
var pass = connection.escape(req.params.pass);
res.send(JSON.stringify(req.body));
});

app.get('/Tournament/:id', function(req, res, next) {
	connection.query('SELECT * from Tournament where Tournament_id = ' + connection.escape(req.params.id), function(err, rows, fields) {
  if (err) throw err;
  var jsonString = JSON.stringify(rows);
  res.send(jsonString);
});
});


https.createServer(connect.certificate,app).listen(2800);
