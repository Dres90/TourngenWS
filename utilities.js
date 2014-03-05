/*
General Web Services Additional Functions
Andres Cardenas
28/02/2014
*/

var mysql_date 	=	function(date)
{
	return date.toISOString().slice(0, 19).replace('T', ' ');
}

module.exports.mysql_date = mysql_date;
