/*
Web Service for match querying
Requires NodeJS, Mysql and Express modules
Andres Cardenas
28/02/2014
*/

//Import necessary modules
var util = require ('./utilities.js');
var validator = require('validator');
var Q = require('Q');

/*---match GET All Web Service
Receives a JSON with the token identifying the client and a tournament id
Returns a JSON with the matches in the tournament
*/

//Main function
var GetAll = function(req, res, next) 
{
	var body = req.body;
	var token = body.token;
	var tournament = body.tournament;
	
	if (validator.isNull(token)||validator.isNull(tournament))
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
		getUserID(token,tournament).then(function(response)
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
function getUserID(token,tournament)
{
	var deferred = Q.defer();
	util.getUserID(token).then(function(result)
	{
		deferred.resolve(getPermission(result,tournament));
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}
function getPermission(user,tournament)
{
	var deferred = Q.defer();
	util.get_permission(tournament,user).then(function(result)
	{
		if (result==0)
		{
			var err = {};
			err.code = 'privilege_error';
			deferred.reject(err);
		}
		else
		{
			deferred.resolve(getmatches(tournament));
		}
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}
//Gets match list
function getmatches(tournament)
{
	var deferred = Q.defer();
	var sql = 'SELECT * from match where tournament_id=?;';
	var params = [tournament];
	util.query(sql,params).then(function(result)
	{
		if (result[0].length<1)
		{
			var response = {};
			response.code = 'no_matches';
			deferred.reject(response);
		}
		else
		{	
			var response = {}
			response.matches=result[0];
			deferred.resolve(response);
		}
		
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}

/*---match GET Web Service
Receives a JSON with the token identifying the client
And the match id as a url parameter
Returns a JSON describing the match
*/	
//Main function
var Get = function(req, res, next) 
{
	var id = req.params.id;
	var token = req.body.token;
	
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
		getUserIDget(id,token).then(function(response)
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
function getUserIDget(match,token)
{
	var deferred = Q.defer();
	util.getUserID(token).then(function(result)
	{
		deferred.resolve(getTournamentID(result,match));
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}

function getTournamentID(user,matchID)
{
	var deferred = Q.defer();
	var sql = 'SELECT * from match where match_id=?';
	var params = [matchID];
	util.query(sql,params).then(function(result)
	{
		if (result[0].length<1)
		{
			var response = {};
			response.code = 'no_match';
			deferred.reject(response);
		}
		else
		{	
			deferred.resolve(getmatch(result[0][0],user));
		}
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}

//Gets match while validating permission
function getmatch(match,user)
{
	var deferred = Q.defer();
	util.get_permission(match.Tournament_id,user).then(function(result)
	{
		if (result!=0)
		{
			deferred.resolve(match);
		}
		else
		{
			var err = {};
			err.code = 'privilege_error';
			deferred.reject(err);
		}
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}

module.exports.GetAll = GetAll;
module.exports.Get = Get;