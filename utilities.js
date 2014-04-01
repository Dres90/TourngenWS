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

var tokenValid = function(token)
{
	return (token.length==44);
}

var getUserID = function(token)
{
	var deferred = Q.defer();
	var sql = 'SELECT User_id from token WHERE token = ? AND Expire_date > ?';
	var now = new Date();
	var myDate = mysql_date(now);
	var params = [token,myDate];
	queryDB(sql,params).then(function(result)
	{
		if (result[0].length<1)
		{
			var response = {};
			response.code = 'user_not_found';
			deferred.reject(response);
		}
		else
		{	
			deferred.resolve(result[0][0].User_id);
		}
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}

var get_permission = function(user,tournament)
{
	var deferred = Q.defer();
	var sql = 'SELECT Privilege_id from tournament_rights WHERE Tournament_id = ? AND User_id =	 ?';
	var params = [tournament,user];
	queryDB(sql,params).then(function(result)
	{
		if (result[0].length<1)
		{
			deferred.resolve(0);
		}
		else
		{	
			deferred.resolve(result[0][0].Privilege_id);
		}
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}

module.exports.mysql_date = mysql_date;
module.exports.query = queryDB;
module.exports.tokenValid = tokenValid;
module.exports.getUserID = getUserID;

