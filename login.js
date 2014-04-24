/*
Web Services for Login and token creation
Requires NodeJS, Mysql and Express modules
Andres Cardenas
28/02/2014
*/

//Import necessary modules
var util = require ('./utilities.js');
var validator = require('validator');
var Q = require('q');

/*---Login GET Web Service
Receives a JSON with the username, the password and the identifier
It validates the login information
If the login is correct, it creates a token by using the crypto library
It inserts the token into the database and makes it valid for a year after creation
It also returns the token to the client
If the login is incorrect, a JSON with an incorrect status is passed to the client
*/

//Main function
var Get = function(req, res, next) 
{
	var user = decodeURIComponent(req.params.username);
	var password = decodeURIComponent(req.query.password);
	var identifier = decodeURIComponent(req.query.identifier);
	
	if (validator.isNull(user)||validator.isNull(password)||validator.isNull(identifier)) //Checks if inputs are null
	{
		var response = {};
		response.success = false;
		response.code = 'null_data';
		res.json(response);
	}
	else if(!validator.isUUID(identifier)) //Checks if identifier is a valid UUID
	{
		var response = {};
		response.success = false;
		response.code = 'UUID_error';
		res.json(response);
	}
	else
	{
		args = {};
		args.username = user;
		args.password = password;
		validateUser(args).then(function(response)
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
//Validates if user in database
function validateUser(args)
{
	var deferred = Q.defer();
	var sql = 'SELECT id,password from auth_user WHERE username = ?';
	var params = [args.username];
	util.query(sql,params).then(function(result)
	{
		if (result[0].length<1)
		{
			var response = {};
			response.code = 'wrong_credentials';
			deferred.reject(response);
		}
		else
		{	
			args.userid=result[0][0].id;
			deferred.resolve(validatePass(args,result[0][0].password));
		}
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}
//Validates if password is valid
function validatePass(args,hashedPassword)
{
	var deferred = Q.defer();
	asyncValidatePass(args.password,hashedPassword).then(function(result)
	{	
		if (result=='0'||result=='-1')	//If password is not correct
		{
			var response = {};
			response.code = 'wrong_credentials';
			deferred.reject(response);
		}
		else 
		{
			deferred.resolve(insertToken(args));
		}

	},function(err)
	{
		deferred.reject(err);
	});
	return deferred.promise;
}
//Inserts the token in the database
function insertToken(args)
{	
	var deferred = Q.defer();
	var now = new Date();
	var hash = createToken(args.username,args.identifier);
	var expiring = new Date();
	expiring.setDate(now.getDate()+365);
	var expire = util.mysql_date(expiring);
	var sql = 'INSERT into token VALUES (?,?,?)';
	var params = [hash,args.userid,expire];
	util.query(sql,params).then(function(result)
	{
		var response = {};
		response.token = hash;
		deferred.resolve(response);
		
	},function(err)
	{
		deferred.reject(err);
	});
	return deferred.promise;
}
//--Utilities for Get Web Service	
function createToken(user,identifier)
{
	var crypto    = require('crypto');
	var now		  = new Date();	
	var text      = user+identifier+now;
	var key       = 'secret';
	var algorithm = 'sha256';
	var hash, hmac;
	hmac = crypto.createHmac(algorithm, key);
	hmac.setEncoding('base64');
	hmac.write(text);
	hmac.end();
	hash = hmac.read();
	return hash;
}
function asyncValidatePass(raw,hashed)
{
	var deferred = Q.defer();
	var spawn = require('child_process').spawn;
	var filename = 'user_auth.py'; //Start python password checking script
	var arg1 = 'check';
	var arg2 = raw;
	var arg3 = hashed;
	
	var passTest = spawn('python', [filename, arg1, arg2, arg3]);
	passTest.stdout.on('data',function(data)
	{
		deferred.resolve(data);
	});
	
	return deferred.promise;
}


/*---Login POST Web Service
Receives a JSON with the username, password, e-mail, first name, last name
It validates that the username is not taken
It returns a JSON with incorrect status and a message if it is
If the username is available it creates the user and returns a JSON with a success status
*/

//Main function
var Post = function(req, res, next) 
{
	var body = req.body;
	var user = body.username;
	var password = body.password;
	var email = body.email;
	var name = body.name;
	var lastname = body.lastname;
	
	//Check for null inputs
	if (validator.isNull(user)||validator.isNull(password)||validator.isNull(email)||validator.isNull(name)||validator.isNull(lastname))
	{
		var response = {};
		response.success = false;
		response.code = 'null_data';
		res.json(response);
	}
	//Checks if email is valid
	else if(!validator.isEmail(email))
	{
		var response = {};
		response.success = false;
		response.code = 'invalid_email';
		res.json(response);
	}
	else
	{
		checkUserExists(body).then(function(response)
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
//Validates if user in database
function checkUserExists(args)
{
	var deferred = Q.defer();
	var sql = 'SELECT id from auth_user WHERE username = ?';
	var params = [args.username];
	util.query(sql,params).then(function(result)
	{
		if (result[0].length>0)
		{
			var response = {};
			response.code = 'user_taken';
			deferred.reject(response);
		}
		else
		{	
			deferred.resolve(createPass(args));
		}
	}, function(err)
	{
		deferred.reject(err);
	}
	);
	return deferred.promise;
}
//Validates if password is valid
function createPass(args)
{
	var deferred = Q.defer();
	asyncCreatePass(args.password).then(function(result)
	{	
		var hash = result+'';
		deferred.resolve(insertUser(args,hash));
	},function(err)
	{
		deferred.reject(err);
	});
	return deferred.promise;
}
//Inserts the token in the database
function insertUser(args,hash)
{
	var deferred = Q.defer();
	var now = new Date();
	var myDate = util.mysql_date(now);

	var sql = 'INSERT into auth_user VALUES (null,?,?,false,?,?,?,?,false,true,?)';
	var params = [hash,myDate,args.username,args.name,args.lastname,args.email,myDate];
	util.query(sql,params).then(function(result)
	{
		var response = {};;
		deferred.resolve(response);
	},function(err)
	{
		deferred.reject(err);
	});
	return deferred.promise;
}
//--Utilities for Post Web Service	
function asyncCreatePass(raw)
{
	var deferred = Q.defer();
	var spawn = require('child_process').spawn;
	var filename = 'user_auth.py'; //Start python password checking script
	var arg1 = 'make';
	var arg2 = raw;
	
	var passTest = spawn('python', [filename, arg1, arg2]);
	passTest.stdout.on('data',function(data)
	{
		deferred.resolve(data);
	});
	
	return deferred.promise;
}

/*---Login DELETE Web Service
Receives the token to be deleted in the url parameter
If it receives a valid length token it returns a success status
*/

//Main function
var Delete = function(req, res, next) 
{
	var token = decodeURIComponent(req.params.token);
	
	//Check for null inputs
	if (validator.isNull(token))
	{
		var response = {};
		response.success = false;
		response.code = 'null_data';
		res.json(response);
	}
	//Checks if token has valid length
	else if(!util.tokenValid(token))
	{
		var response = {};
		response.success = false;
		response.code = 'invalid_token';
		res.json(response);
	}
	else
	{
		var sql = 'DELETE FROM token WHERE token = ?';
		var params = [token];
		util.query(sql,params).then(function(result)
		{
			var response={};
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

module.exports.Get = Get;
module.exports.Post = Post;
module.exports.Delete = Delete;