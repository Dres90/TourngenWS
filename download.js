/*
Web Service to download Tourngen apk
Andres Cardenas
10/09/2014
*/

var express = require('express');
var connect = require('./connect.js');
var app = express();

app.get('/Download', function(req, res){
  var file = __dirname + '/Tourngen.apk';
  res.download(file); // Set disposition and send it.
});

var server = app.listen(connect.DL_port, function() {
    console.log('Listening on port %d', server.address().port);
});