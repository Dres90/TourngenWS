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
var connect = require('./connect.js');

//Initial configuration for Express
var app = express();
app.use(express.json());
app.use(express.urlencoded());


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

https.createServer(connect.certificate,app).listen(2800);
console.log('Server started on 2800');