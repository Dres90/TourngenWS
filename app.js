/*
Web Services Initialization
Requires NodeJS and Express modules
Andres Cardenas
28/02/2014
*/

//Import necessary modules
var express = require('express');
var https = require('https');
var login = require('./login.js');
var tournament = require('./tournament.js');
var team = require('./team.js');
var fixture = require('./fixture.js');
var match = require('./match.js');
var connect = require('./connect.js');
var bodyParser = require('body-parser');

//Initial configuration for Express
var app = express();
app.use(bodyParser());

app.get('/',function(req,res,next)
{res.send("Tourngen Web Services, contact acardenas90@gmail.com")});

app.get('/Login/:username', login.Get);
app.post('/Login/', login.Post);
app.del('/Login/:token', login.Delete);

app.get('/Tournament/', tournament.GetAll);
app.post('/Tournament/', tournament.Post);
app.get('/Tournament/:id', tournament.Get);
app.put('/Tournament/:id', tournament.Put);
app.post('/Tournament/:id', tournament.Sync);

app.get('/Team/', team.GetAll);
app.get('/Team/:id', team.Get);

app.get('/Fixture/', fixture.GetAll);
app.get('/Fixture/:id', fixture.Get);

app.get('/Match/', match.GetAll);
app.get('/Match/:id', match.Get);
app.put('/Match/:id', match.Put);

app.get('/Download', function(req, res){
  var file = __dirname + '/Tourngen.apk';
  res.download(file); // Set disposition and send it.
});

https.createServer(connect.certificate,app).listen(8080);
console.log('Server started on 8080');
