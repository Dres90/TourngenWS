/*
General Web Services Additional Functions
Andres Cardenas
28/02/2014
*/

var mysql  = require('mysql');
var connect = require ('./connect.js');
var Q = require('Q');

//Create connection to mysql database
var connection = mysql.createConnection(
{
	host:connect.host, 
	user:connect.user, 
	password:connect.password, 
	database:connect.database
});

//Start connection to MySQL
connection.connect(function(err)
{
	if (err) throw err;
});

function queryDB(sql,args)
{
	sql = mysql.format(sql,args);
	var defered = Q.defer();
	connection.query(sql,defered.makeNodeResolver());
	return defered.promise;
}

var mysql_date = function(date)
{
	return date.toISOString().slice(0, 19).replace('T', ' ');
}

module.exports.mysql_date = mysql_date;
module.exports.query = queryDB;
