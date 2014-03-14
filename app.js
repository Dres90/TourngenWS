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
var connect = require('./connect.js');

//Initial configuration for Express
var app = express();
app.use(express.json());
app.use(express.urlencoded());


app.get('/Login/:username', login.Get);
app.post('/Login/', login.Post);


https.createServer(connect.certificate,app).listen(2800);
console.log('Server started on 2800');