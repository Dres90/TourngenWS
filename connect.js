/*
General Web Services Configuration File
Andres Cardenas
28/02/2014
*/

var host 		=	'localhost';
var database 	= 	'tourngen';
var user 		=	'root';
var password	=	'pass123';
var DB_port		=	'3306';
var key 		=	'keys/key.pem';
var cert		=	'keys/cert.pem';
var WS_port		=	'2800';


var fs = require('fs');
module.exports.host = host;
module.exports.database = database;
module.exports.user = user;
module.exports.password = password;
module.exports.DB_port = DB_port;
module.exports.certificate = {
  key: fs.readFileSync(key),
  cert: fs.readFileSync(cert)
};
module.exports.WS_port = WS_port;