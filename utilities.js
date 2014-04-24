/*
General Web Services Additional Functions
Andres Cardenas
28/02/2014
*/

var mysql  = require('mysql');
var connect = require ('./connect.js');
var Q = require('q');

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
	console.log(sql);
	var defered = Q.defer();
	connection.query(sql,defered.makeNodeResolver());
	return defered.promise;
}

function bulkQueryDB(sql,args)
{
	var defered = Q.defer();
	connection.query(sql,[args],defered.makeNodeResolver());
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


var get_permission = function(tournament,user)
{
	var deferred = Q.defer();
	var sql = 'SELECT distinct T.Tournament_id, IF(user_id = ?,G.Privilege_id,5) as privilege_id FROM tournament as T LEFT JOIN tournament_rights as G on T.tournament_id = G.tournament_id where (user_id = ? or (user_id <> ? AND public = true AND G.Tournament_id not in (select T.Tournament_id FROM tournament as T LEFT JOIN tournament_rights as G on T.tournament_id = G.tournament_id where user_id = ?))) AND T.tournament_id = ? order by privilege_id;'
	var params = [user,user,user,user,tournament];
	queryDB(sql,params).then(function(result)
	{
		if (result[0].length<1)
		{
			deferred.resolve(0);
		}
		else
		{	
			deferred.resolve(result[0][0].privilege_id);
		}
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}


//Dictionary implementation from http://stackoverflow.com/questions/5745960/javascript-dictionary-with-names
function JSdict() {
    this.Keys = [];
    this.Values = [];
}

// Check if dictionary extensions aren't implemented yet.
// Returns value of a key
if (!JSdict.prototype.getVal) {
    JSdict.prototype.getVal = function (key) {
        if (key == null) {
            return "Key cannot be null";
        }
        for (var i = 0; i < this.Keys.length; i++) {
            if (this.Keys[i] == key) {
                return this.Values[i];
            }
        }
        return "Key not found!";
    }
}


// Check if dictionary extensions aren't implemented yet.
// Updates value of a key
if (!JSdict.prototype.update) {
    JSdict.prototype.update = function (key, val) {
        if (key == null || val == null) {
            return "Key or Value cannot be null";
        }
        // Verify dict integrity before each operation
        if (keysLength != valsLength) {
            return "Dictionary inconsistent. Keys length don't match values!";
        }
        var keysLength = this.Keys.length;
        var valsLength = this.Values.length;
        var flag = false;
        for (var i = 0; i < keysLength; i++) {
            if (this.Keys[i] == key) {
                this.Values[i] = val;
                flag = true;
                break;
            }
        }
        if (!flag) {
            return "Key does not exist";
        }
    }
}



// Check if dictionary extensions aren't implemented yet.
// Adds a unique key value pair
if (!JSdict.prototype.add) {
    JSdict.prototype.add = function (key, val) {
        // Allow only strings or numbers as keys
        if (typeof (key) == "number" || typeof (key) == "string") {
            if (key == null || val == null) {
                return "Key or Value cannot be null";
            }
            if (keysLength != valsLength) {
                return "Dictionary inconsistent. Keys length don't match values!";
            }
            var keysLength = this.Keys.length;
            var valsLength = this.Values.length;
            for (var i = 0; i < keysLength; i++) {
                if (this.Keys[i] == key) {
                    return "Duplicate keys not allowed!";
                }
            }
            this.Keys.push(key);
            this.Values.push(val);
        }
        else {
            return "Only number or string can be key!";
        }
    }
}

// Check if dictionary extensions aren't implemented yet.
// Removes a key value pair
if (!JSdict.prototype.remove) {
    JSdict.prototype.remove = function (key) {
        if (key == null) {
            return "Key cannot be null";
        }
        if (keysLength != valsLength) {
            return "Dictionary inconsistent. Keys length don't match values!";
        }
        var keysLength = this.Keys.length;
        var valsLength = this.Values.length;
        var flag = false;
        for (var i = 0; i < keysLength; i++) {
            if (this.Keys[i] == key) {
                this.Keys.shift(key);
                this.Values.shift(this.Values[i]);
                flag = true;
                break;
            }
        }
        if (!flag) {
            return "Key does not exist";
        }
    }
}
module.exports.get_permission = get_permission;
module.exports.mysql_date = mysql_date;
module.exports.query = queryDB;
module.exports.bulkQuery = bulkQueryDB;
module.exports.tokenValid = tokenValid;
module.exports.getUserID = getUserID;
module.exports.JSdict = JSdict;
