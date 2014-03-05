var spawn = require('child_process').spawn;

var filename = 'user_auth.py';
var arg1 = 'check';
var arg2 = 'password';
var arg3 = 'pbkdf2_sha256$12000$2aS385R1SGdZ$vEf5Bl1ebsXxKfeRnIo6+SUnD7i5hq5oCN5hcJVGwUM=';

var passTest = spawn('python', [filename, arg1, arg2, arg3]);

passTest.stdout.on('data', function(data)
{
console.log('stdout: '+data);
});
passTest.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});
passTest.on('close', function (code) {
  console.log('child process exited with code ' + code);
});