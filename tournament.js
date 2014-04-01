/*
Web Service for Tournament creation and querying
Requires NodeJS, Mysql and Express modules
Andres Cardenas
28/02/2014
*/

//Import necessary modules
var util = require ('./utilities.js');
var validator = require('validator');
var Q = require('Q');

/*---Tournament GET All Web Service
Receives a JSON with the token identifying the client
Returns a JSON with the necessary 
*/

//Main function
var GetAll = function(req, res, next) 
{
	var body = req.body;
	var token = body.token;
	
	if (validator.isNull(token))
	{
		var response = {};
		response.success = false;
		response.code = 'null_data';
		res.json(response);
	}
	else if(!util.tokenValid(token))
	{
		var response = {};
		response.success = false;
		response.code = 'invalid_token';
		res.json(response);
	}
	else
	{
		getUserID(token).then(function(response)
		{
			response.success=true;
			res.json(response);
		},
		function(err)
		{
			var response={};
			response.success = false;
			response.code = err.code;
			res.json(response);
		});
	}
}
//Gets user id from token
function getUserID(token)
{
	var deferred = Q.defer();
	util.getUserID(token).then(function(result)
	{
		deferred.resolve(getTournaments(result));
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}
//Gets tournament list
function getTournaments(user)
{
	var deferred = Q.defer();
	var sql = 'SELECT distinct T.Tournament_id, T.Name, T.Date_start, T.date_end, T.Home_and_away, T.Info, T.Last_updated, T.Status, T.Public, IF(user_id = ?,G.Privilege_id,5) as privilege_id FROM tournament as T LEFT JOIN tournament_rights as G on T.tournament_id = G.tournament_id where user_id = ? or (user_id <> ? AND public = true and G.Tournament_id not in (select T.Tournament_id FROM tournament as T LEFT JOIN tournament_rights as G on T.tournament_id = G.tournament_id where user_id = ?)) order by privilege_id;';
	var params = [user,user,user,user];
	util.query(sql,params).then(function(result)
	{
		if (result[0].length<1)
		{
			var response = {};
			response.code = 'no_tournaments';
			deferred.reject(response);
		}
		else
		{	
			var response = {}
			deferred.resolve(result[0]);
		}
		
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}

/*---Tournament Post Web Service
Receives a JSON with the token describing the new tournament
Returns a JSON with the ids of the entities inserted
*/

//Main function
var Post = function(req, res, next) 
{
	var body = req.body;
	var token = body.token;
	
	if (validator.isNull(token))
	{
		var response = {};
		response.success = false;
		response.code = 'null_data';
		res.json(response);
	}
	else if(!util.tokenValid(token))
	{
		var response = {};
		response.success = false;
		response.code = 'invalid_token';
		res.json(response);
	}
	else
	{
		getUserIDPost(body).then(function(response)
		{
			response.success=true;
			res.json(response);
		},
		function(err)
		{
			var response={};
			response.success = false;
			response.code = err.code;
			res.json(response);
		});
	}
}
function getUserIDPost(body)
{
	var deferred = Q.defer();
	util.getUserID(body.token).then(function(result)
	{
		deferred.resolve(insertTournament(result,body));
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}
function insertTournament(user,b)
{
	var deferred = Q.defer();
	var now = new Date();
	var sqlnow = util.mysql_date(now);
	var sql = 'INSERT into tournament VALUES (null,?,?,?,?,?,?,1,?);';
	var params = [b.name,b.date_start,b.date_end,b.home_and_away,b.info,sqlnow,b.isPublic];
	util.query(sql,params).then(function(result)
	{
		var response = {}
		deferred.resolve(result);	
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}

module.exports.GetAll = GetAll;
module.exports.Post = Post;