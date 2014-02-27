var spawn = require('child_process').spawn,
passTest = spawn('python', ['passTest.py', 'param1', 'param2', 'param3']);

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