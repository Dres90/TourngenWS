/*
Web Service for fixture querying
Requires NodeJS, Mysql and Express modules
Andres Cardenas
28/02/2014
*/

//Import necessary modules
var util = require ('./utilities.js');
var validator = require('validator');
var Q = require('Q');

/*---Fixture GET All Web Service
Receives a JSON with the token identifying the client and a tournament id
Returns a JSON with the fixtures in the tournament
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
			deferred.resolve(getFixtures(tournament));
		}
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}
//Gets fixture list
function getFixtures(tournament)
{
	var deferred = Q.defer();
	var sql = 'SELECT * from fixture where tournament_id=?;';
	var params = [tournament];
	util.query(sql,params).then(function(result)
	{
		if (result[0].length<1)
		{
			var response = {};
			response.code = 'no_fixtures';
			deferred.reject(response);
		}
		else
		{	
			var response = {}
			response.fixtures=result[0];
			deferred.resolve(response);
		}
		
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}

/*---Fixture GET Web Service
Receives a JSON with the token identifying the client
And the fixture id as a url parameter
Returns a JSON describing the fixture
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
function getUserIDget(fixture,token)
{
	var deferred = Q.defer();
	util.getUserID(token).then(function(result)
	{
		deferred.resolve(getTournamentID(result,fixture));
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}

function getTournamentID(user,fixtureID)
{
	var deferred = Q.defer();
	var sql = 'SELECT * from fixture where fixture_id=?';
	var params = [fixtureID];
	util.query(sql,params).then(function(result)
	{
		if (result[0].length<1)
		{
			var response = {};
			response.code = 'no_fixture';
			deferred.reject(response);
		}
		else
		{	
			deferred.resolve(getFixture(result[0][0],user));
		}
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}

//Gets fixture while validating permission
function getFixture(fixture,user)
{
	var deferred = Q.defer();
	util.get_permission(fixture.Tournament_id,user).then(function(result)
	{
		if (result!=0)
		{
			deferred.resolve(fixture);
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