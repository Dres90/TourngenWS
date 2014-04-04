/*
Web Service for match querying
Requires NodeJS, Mysql and Express modules
Andres Cardenas
28/02/2014
*/

//Import necessary modules
var util = require ('./utilities.js');
var validator = require('validator');
var Q = require('q');

/*---Match GET All Web Service
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
			deferred.resolve(getMatches(tournament));
		}
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}
//Gets match list
function getMatches(tournament)
{
	var deferred = Q.defer();
	var sql = 'SELECT m.match_id, m.fixture_id, m.home_id, m.away_id, m.date, m.info, m.last_updated, m.status, m.score_home, m.score_away, m.played, f.tournament_id, f.number FROM `match` as m inner join fixture as f on m.fixture_id=f.fixture_id where f.tournament_id=? order by number;';
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

/*---Match GET Web Service
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
	var sql = 'SELECT m.match_id, m.fixture_id, m.home_id, m.away_id, m.date, m.info, m.last_updated, m.status, m.score_home, m.score_away, m.played, f.tournament_id, f.number FROM `match` as m inner join fixture as f on m.fixture_id=f.fixture_id where m.match_id=?;';
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
			deferred.resolve(getMatch(result[0][0],user));
		}
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}

//Gets match while validating permission
function getMatch(match,user)
{
	var deferred = Q.defer();
	util.get_permission(match.tournament_id,user).then(function(result)
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

/*---Match GET Web Service
Receives a JSON with the token identifying the client
And the match id as a url parameter
Returns a JSON describing the match
*/	
//Main function
var Put = function(req, res, next) 
{
	var token = req.body.token;
	var match = req.body.match;
	match.id = req.params.id;
	
	if (validator.isNull(token)||!match)
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
		getUserIDput(match,token).then(function(response)
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
function getUserIDput(match,token)
{
	var deferred = Q.defer();
	util.getUserID(token).then(function(result)
	{
		deferred.resolve(getTournamentIDput(result,match));
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}

function getTournamentIDput(user,match)
{
	var deferred = Q.defer();
	var sql = 'SELECT f.tournament_id FROM `match` as m inner join fixture as f on m.fixture_id=f.fixture_id where m.match_id=?;';
	var params = [match.id];
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
			deferred.resolve(getPermissionPut(user,result[0][0].tournament_id,match));
		}
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}
function getPermissionPut(user,tournamentID,match)
{
	var deferred = Q.defer();
	util.get_permission(tournamentID,user).then(function(result)
	{
		if (result==0||result==3||result==4||result==5)
		{
			var err = {};
			err.code = 'privilege_error';
			deferred.reject(err);
		}
		else
		{
			deferred.resolve(updateMatch(match));
		}
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}

//Updates tournament
function updateMatch(m)
{
	var deferred = Q.defer();
	var sql = 'UPDATE `match` SET last_updated = ?';
	var params = [];
	var now = new Date();
	var sqlnow = util.mysql_date(now);
	params[0] = now;
	var i = 1;
	if (m.date)
	{
		sql = sql + ', date = ?';
		params[i]=m.date
		i++;
	}
	if (m.info)
	{
		sql = sql + ', info = ?';
		params[i]=m.info
		i++;
	}
	if (m.played)
	{
		sql = sql + ', played = ?';
		params[i]=m.played
		i++;
	}
	if (m.score_home)
	{
		sql = sql + ', score_home = ?';
		params[i]=m.score_home
		i++;
	}
	if (m.score_away)
	{
		sql = sql + ', score_away = ?';
		params[i]=m.score_away
		i++;
	}
		
	sql	= sql+' WHERE Match_id=?;';
	params[i]=m.id;
	
	
	util.query(sql,params).then(function(result)
	{
		var response = {};
		deferred.resolve(response);
		
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}

module.exports.GetAll = GetAll;
module.exports.Get = Get;
module.exports.Put = Put;