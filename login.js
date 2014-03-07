/*
Web Services for Login and token creation
Requires NodeJS, Mysql and Express modules
Andres Cardenas
28/02/2014
*/

//Import necessary modules
var connect = require ('./connect.js');
var utilities = require ('./utilities.js');
var mysql  = require('mysql');

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

/*
Login GET Web Service
Receives a JSON with the username, the password and the identifier
It validates the login information
If the login is correct, it creates a token by using the crypto library
It inserts the token into the database and makes it valid for a year after creation
It also returns the token to the client
If the login is incorrect, a JSON with an incorrect status is passed to the client
*/
var Get = function(req, res, next) 
{
	var body = req.body;
	var user = body.username;
	var password = body.password;
	var identifier = body.identifier;
	
	if ((!body)||(!user)||(!password)||(!identifier)) //Checks if inputs are null
	{
		var response = {};
		response.success = false;
		response.message = 'null_data';
		res.json(response);
	}
	else
	{
		var sql = 'SELECT id,password from auth_user WHERE username = ?';
		var params = [user];
		sql = mysql.format(sql,params);
		connection.query(sql, function(err, user_rows, user_fields)
		{
			if (err||user_rows.length<1) //If user does not exist or error in the query
			{
				var response = {};
				response.success = false;
				response.message = 'wrong_credentials';
				res.json(response);
			}
			else
			{
				var spawn = require('child_process').spawn;
				var filename = 'user_auth.py';
				var arg1 = 'check';
				var arg2 = password;
				var arg3 = user_rows[0].password;
				var passTest = spawn('python', [filename, arg1, arg2, arg3]);

				passTest.stdout.on('data', function(data)
				{
					if (data=='0'||data=='-1')	//If password is not correct
					{
						var response = {};
						response.success = false;
						response.message = 'wrong_credentials';
						res.json(response);
					}
					else 
					{
						var now = new Date();
						var hash = createToken(user,identifier);
						var expiring = new Date();
						expiring.setDate(now.getDate()+365);
						var expire = utilities.mysql_date(expiring);
						var sql = 'INSERT into Token VALUES (?,?,?)';
						var params = [hash,user_rows[0].id,expire];
						sql = mysql.format(sql,params);
						connection.query(sql, function(err)
						{
							var response = {};
							if (err) 
							{
								response.success = false;
								response.message = err.code;
							}
							else
							{	
								response.success = true;
								response.token = hash;
							}
							res.json(response);
						});
					}
				});	
			}		
		});
	}
}

/*
Login POST Web Service
Receives a JSON with the username, password, e-mail, first name, last name
It validates that the username is not taken
It returns a JSON with incorrect status and a message if it is
If the username is available it creates the user and returns a JSON with a success status
*/
var Post = function(req, res, next)
{
	var body = req.body;
	var user = body.username;
	var password = body.password;
	var email = body.email;
	var firstName = body.first_name;
	var lastName = body.last_name;
	
	//Checks if inputs are null
	if ((!body)||(!user)||(!password)||(!email)||(!firstName)||(!lastName)) 
	{
		var response = {};
		response.success = false;
		response.message = 'null_data';
		res.json(response);
	}
	else
	{
		var sql = 'SELECT id,password from auth_user WHERE username = ?';
		var params = [user];
		sql = mysql.format(sql,params);
		connection.query(sql, function(err, user_rows, user_fields)
		{
			if (err||user_rows.length<1) //If user does not exist or error in the query
			{
				var response = {};
				response.success = false;
				response.message = 'wrong_credentials';
				res.json(response);
			}
			else
			{
				var spawn = require('child_process').spawn;
				var filename = 'user_auth.py';
				var arg1 = 'check';
				var arg2 = password;
				var arg3 = user_rows[0].password;
				var passTest = spawn('python', [filename, arg1, arg2, arg3]);

				passTest.stdout.on('data', function(data)
				{
					if (data=='0'||data=='-1')	//If password is not correct
					{
						var response = {};
						response.success = false;
						response.message = 'wrong_credentials';
						res.json(response);
					}
					else 
					{
						var now = new Date();
						var hash = createToken(user,identifier);
						var expiring = new Date();
						expiring.setDate(now.getDate()+365);
						var expire = utilities.mysql_date(expiring);
						var sql = 'INSERT into Token VALUES (?,?,?)';
						var params = [hash,user_rows[0].id,expire];
						sql = mysql.format(sql,params);
						connection.query(sql, function(err)
						{
							var response = {};
							if (err) 
							{
								response.success = false;
								response.message = err.code;
							}
							else
							{	
								response.success = true;
								response.token = hash;
							}
							res.json(response);
						});
					}
				});	
			}		
		});
	}
}

//Create unique token using the user and identifier passed
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

module.exports.Get = Get;