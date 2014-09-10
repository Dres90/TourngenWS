/*
General Web Services Configuration File
Andres Cardenas
28/02/2014
*/

var host 		=	'127.0.0.1';
var database 	= 	'tgDEV';
var user 		=	'root';
var password	=	'PokemonDigimon';
var DB_port		=	'3306';
var key 		=	'keys/key.pem';
var cert		=	'keys/cert.pem';
var WS_port		=	'8080';
var DL_port 	= 	'8081';

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
module.exports.DL_port = DL_port;
