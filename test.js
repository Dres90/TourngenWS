var spawn = require('child_process').spawn;

var filename = 'passTest.py';
var arg1 = 'check';
var arg2 = 'Simple123';
var arg3 = 'pbkdf2_sha256$10000$NmzpPCQiTe2R$U8ipSsOy3Xz7FwWDHdH/dTei8Xh4Q7NGtdzrCacSfvo=';

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