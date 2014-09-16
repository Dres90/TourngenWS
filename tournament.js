/*
Web Service for Tournament creation and querying
Requires NodeJS, Mysql and Express modules
Andres Cardenas
28/02/2014
*/

//Import necessary modules
var util = require ('./utilities.js');
var validator = require('validator');
var Q = require('q');

/*---Tournament GET All Web Service
Receives a JSON with the token identifying the client
Returns a JSON with the tournaments that matter to the user
*/

//Main function
var GetAll = function(req, res, next) 
{
	var token = decodeURIComponent(req.query.token);
	
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
	var sql = 'SELECT distinct T.Tournament_id, T.Name, T.Date_start, T.date_end, T.Home_and_away, T.Info, T.Last_updated, T.Status, T.Public, IF(user_id = ?,G.Privilege_id,5) as privilege_id FROM tournament as T LEFT JOIN tournament_rights as G on T.tournament_id = G.tournament_id where T.Status=1 and (user_id = ? or (user_id <> ? AND public = true and G.Tournament_id not in (select T.Tournament_id FROM tournament as T LEFT JOIN tournament_rights as G on T.tournament_id = G.tournament_id where user_id = ?))) order by privilege_id;';
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
			response.tournaments=result[0];
			deferred.resolve(response);
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
//Gets user id from token
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
//Inserts tournaments
function insertTournament(user,b)
{
	var deferred = Q.defer();
	var now = new Date();
	var sqlnow = util.mysql_date(now);
	var sql = 'INSERT into tournament VALUES (null,?,?,?,?,?,?,1,?);';
	var params = [b.name,b.date_start,b.date_end,b.home_and_away,b.info,sqlnow,b.is_public];
	util.query(sql,params).then(function(result)
	{
		var ids = {}
		ids.tournament = result[0].insertId;
		deferred.resolve(insertRights(user,b,ids));	
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}
//Inserts tournament permissions
function insertRights(user,b,ids)
{
	var deferred = Q.defer();
	var sql = 'INSERT into tournament_rights VALUES (?,?,1);';
	var params = [ids.tournament,user];
	util.query(sql,params).then(function(result)
	{
		deferred.resolve(insertGuardianRights(user,b,ids));	
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}
//Inserts permissions for django guardian
function insertGuardianRights(user,b,ids)
{
	var deferred = Q.defer();
	var sql = 'INSERT into guardian_userobjectpermission VALUES (null,36,11,?,?);';
	var params = [ids.tournament,user];
	util.query(sql,params).then(function(result)
	{
		deferred.resolve(insertTeams(b,ids));	
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}
//Inserts teams
function insertTeams(b,ids)
{
	var deferred = Q.defer();
	var now = new Date();
	var sqlnow = util.mysql_date(now);
	var sql = 'INSERT into team VALUES ?;';
	var params = [];
	for (var i = 0; i < b.teams.length; i++) 
	{
		var team = [];
		team[0] = null;
		team[1] = ids.tournament;
		team[2] = b.teams[i].name;
		team[3] = b.teams[i].email;
		team[4] = b.teams[i].info;
		team[5] = sqlnow;
		team[6] = 1;
		params[i]=team;
	}
	util.bulkQuery(sql,params).then(function(result)
	{
		var dict = new util.JSdict();
		var insertID = result[0].insertId;
		for (var j = 0; j < b.teams.length; j++) 
		{
			dict.add(b.teams[j].id,insertID);
			insertID++;
		}
		ids.teams = dict;
		deferred.resolve(insertFixtures(b,ids));	
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}
//Inserrts fixtures
function insertFixtures(b,ids)
{
	var deferred = Q.defer();

	var now = new Date();
	var sqlnow = util.mysql_date(now);
	var sql = 'INSERT into fixture VALUES ?;';
	var params = [];
	for (var i = 0; i < b.fixtures.length; i++) 
	{
		var fixture = [];
		fixture[0] = null;
		fixture[1] = ids.tournament;
		fixture[2] = b.fixtures[i].number;
		fixture[3] = b.fixtures[i].info;
		fixture[4] = sqlnow;
		fixture[5] = 1;
		params[i]=fixture;
	}
	util.bulkQuery(sql,params).then(function(result)
	{
		var dict = new util.JSdict();
		var insertID = result[0].insertId;
		for (var j = 0; j < b.fixtures.length; j++) 
		{
			dict.add(b.fixtures[j].id,insertID);
			insertID++;
		}
		ids.fixtures = dict;
		deferred.resolve(insertMatches(b,ids));	
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}
//Inserts matches
function insertMatches(b,ids)
{
	var deferred = Q.defer();
	var now = new Date();
	var sqlnow = util.mysql_date(now);
	var sql = 'INSERT into `match` VALUES ?;';
	var params = [];
	for (var i = 0; i < b.fixtures.length; i++) 
	{
		var fixture = b.fixtures[i];
		for (var j = 0; j < fixture.matches.length; j++) 
		{
			var match = [];
			match[0] = null;
			match[1] = ids.fixtures.getVal(fixture.id);
			match[2] = ids.teams.getVal(fixture.matches[j].home);
			match[3] = ids.teams.getVal(fixture.matches[j].away);
			match[4] = fixture.matches[j].date;
			match[5] = fixture.matches[j].info;
			match[6] = sqlnow;
			match[7] = 1;
			match[8] = fixture.matches[j].score_home;
			match[9] = fixture.matches[j].score_away;
			match[10] = fixture.matches[j].played;
			params[i]=match;
		}
	}
	util.bulkQuery(sql,params).then(function(result)
	{
		var dict = new util.JSdict();
		var insertID = result[0].insertId;
		for (var i = 0; i < b.fixtures.length; i++) 
		{
			var fixture = b.fixtures[i];
			for (var j = 0; j < fixture.matches.length; j++) 
			{
				dict.add(fixture.matches[j].id,insertID);
				insertID++;
			}
		}
		ids.matches = dict;
		deferred.resolve(ids);	
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}

/*---Tournament GET Web Service
Receives a JSON with the token identifying the client
And the tournament id as a url parameter
Returns a JSON describing the tournament
*/
//Main function
var Get = function(req, res, next) 
{
	var id = req.params.id;
	var token = decodeURIComponent(req.query.token);
	
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
function getUserIDget(tournament,token)
{
	var deferred = Q.defer();
	util.getUserID(token).then(function(result)
	{
		deferred.resolve(getTournament(result,tournament));
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}

//Gets tournament
function getTournament(user,tournament)
{
	var deferred = Q.defer();
	var sql = 'SELECT distinct T.Tournament_id, T.Name, T.Date_start, T.date_end, T.Home_and_away, T.Info, T.Last_updated, T.Status, T.Public, IF(user_id = ?,G.Privilege_id,5) as privilege_id FROM tournament as T LEFT JOIN tournament_rights as G on T.tournament_id = G.tournament_id where T.Status=1 and (user_id = ? or (user_id <> ? AND public = true AND G.Tournament_id not in (select T.Tournament_id FROM tournament as T LEFT JOIN tournament_rights as G on T.tournament_id = G.tournament_id where user_id = ?))) AND T.tournament_id = ? order by privilege_id;';
	var params = [user,user,user,user,tournament];
	util.query(sql,params).then(function(result)
	{
		if (result[0].length<1)
		{
			var response = {};
			response.code = 'no_tournament';
			deferred.reject(response);
		}
		else
		{	
			deferred.resolve(result[0][0]);
		}
		
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}


/*---Tournament PUT Web Service
Receives a JSON representing the tournament that must be updated
And the token identifying the user
The tournament ID is passed as a url parameter
Returns a JSON with a status
*/

//Main function
var Put = function(req, res, next) 
{
	var token = req.body.token;
	var tournament = req.body.tournament;
	tournament.id = req.params.id;
	
	if (validator.isNull(token)||!tournament)
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
		getUserIDput(tournament,token).then(function(response)
		{
			response.success = true;
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
function getUserIDput(tournament,token)
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
//Gets permission from tournament and user
function getPermission(user,tournament)
{
	var deferred = Q.defer();
	util.get_permission(tournament.id,user).then(function(result)
	{
		if (result==1)
		{
			deferred.resolve(updateTournament(tournament));
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
//Updates tournament
function updateTournament(t)
{
	var deferred = Q.defer();
	var sql = 'UPDATE tournament SET last_updated = ?';
	var params = [];
	var now = new Date();
	var sqlnow = util.mysql_date(now);
	params[0] = now;
	var i = 1;
	if (t.name)
	{
		sql = sql + ', name = ?';
		params[i]=t.name;
		i++;
	}
	if (t.date_start)
	{
		sql = sql + ', date_start = ?';
		params[i]=t.date_start;
		i++;
	}
	if (t.date_end)
	{
		sql = sql + ', date_end = ?';
		params[i]=t.date_start;
		i++;
	}
	if (t.info)
	{
		sql = sql + ', info = ?';
		params[i]=t.info;
		i++;
	}
	if (t.status)
	{
		sql = sql + ', status = ?';
		params[i]=t.status;
		i++;
	}
	if (t.is_public)
	{
		sql = sql + ', public = ?';
		params[i]=t.is_public;
		i++;
	}
	
	sql	= sql+' WHERE Tournament_id=?;';
	params[i]=t.id;
	
	
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


/*---Tournament POST one Web Service
Receives the id of the tournament, the token of the user and a JSON
with the ids of the entities that will be checked and their last updated dates
Returns a JSON with the id of each entity and the status
0 Up to date
1 Needs get
2 Needs put
*/

//Main function
var Sync = function(req, res, next)
{
	var token = req.body.token;
	var t = req.body.tournament;
	t.id = req.params.id;
	
	if (validator.isNull(token)||!t)
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
		getUserIDsync(t,token).then(function(response)
		{
			response.success = true;
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
function getUserIDsync(tournament,token)
{
	var deferred = Q.defer();
	util.getUserID(token).then(function(result)
	{
		deferred.resolve(getPermissionSync(result,tournament));
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}
//Gets permission from tournament and user
function getPermissionSync(user,tournament)
{
	var deferred = Q.defer();
	util.get_permission(tournament.id,user).then(function(result)
	{
		if (result==0)
		{
			var response = {};
			response.code = 'privilege_error';
			deferred.reject(response);
		}
		deferred.resolve(syncTournament(tournament,result));
	}, function(err)
	{
		defferred.reject(err);
	}
	);
	return deferred.promise;
}
//Updates tournament
function syncTournament(t,permission)
{
	var deferred = Q.defer();
	var sql = 'SELECT if (last_updated=?,0,if(last_updated>? or ?<>1,1,2)) as status from tournament where tournament_id=?;';
	var params = [t.updated,t.updated, permission,t.id];
	util.query(sql,params).then(function(result)
	{
		var response = {};
		response.status = result[0][0].status;
		var teams = [];
		response.teams = teams;
		deferred.resolve(syncTeams(t,permission,response,0));
		
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}

function syncTeams(t,permission,response,counter)
{
	var deferred = Q.defer();
	if (counter<t.teams.length)
	{
		var sql = 'SELECT if (last_updated=?,0,if(last_updated>? or ?<>1,1,2)) as status from team where team_id=?;';
		var params = [t.teams[counter].updated,t.teams[counter].updated,permission,t.teams[counter].id];
		util.query(sql,params).then(function(result)
		{
			var team = {};
			team.id = t.teams[counter].id;
			team.status = result[0][0].status;
			response.teams[counter] = team;
			counter++;
			deferred.resolve(syncTeams(t,permission,response,counter));
			
		}, function(err)
		{
			deferred.reject(err);
		}
		);
	}
	else
	{
		var fixtures = [];
		response.fixtures = fixtures;
		deferred.resolve(syncFixtures(t,permission,response,0));
	}
	return deferred.promise;
}

function syncFixtures(t,permission,response,counter)
{
	var deferred = Q.defer();
	if (counter<t.fixtures.length)
	{
		var sql = 'SELECT if (last_updated=?,0,if(last_updated>? or ?<>1,1,2)) as status from fixture where fixture_id=?;';
		var params = [t.fixtures[counter].updated,t.fixtures[counter].updated,permission,t.fixtures[counter].id];
		util.query(sql,params).then(function(result)
		{
			var fixture = {};
			fixture.id = t.fixtures[counter].id;
			fixture.status = result[0][0].status;
			response.fixtures[counter] = fixture;
			counter++;
			deferred.resolve(syncFixtures(t,permission,response,counter));
			
		}, function(err)
		{
			deferred.reject(err);
		}
		);
	}
	else
	{
		var matches = [];
		response.matches = matches;
		deferred.resolve(syncMatches(t,permission,response,0));
	}
	return deferred.promise;
}
function syncMatches(t,permission,response,counter)
{
	var deferred = Q.defer();
	if (counter<t.matches.length)
	{
		var sql = 'SELECT if (last_updated=?,0,if(last_updated>? or find_in_set(?,"3,4,5")>0,1,2)) as status from `match` where match_id=?;';
		var params = [t.matches[counter].updated,t.matches[counter].updated,permission,t.matches[counter].id];
		util.query(sql,params).then(function(result)
		{
			var match = {};
			match.id = t.matches[counter].id;
			match.status = result[0][0].status;
			response.matches[counter] = match;
			counter++;
			deferred.resolve(syncMatches(t,permission,response,counter));
			
		}, function(err)
		{
			deferred.reject(err);
		}
		);
	}
	else
	{
		deferred.resolve(response);
	}
	return deferred.promise;
}

module.exports.GetAll = GetAll;
module.exports.Post = Post;
module.exports.Get = Get;
module.exports.Put = Put;
module.exports.Sync = Sync;
