var spawn = require('child_process').spawn,
<<<<<<< HEAD
passTest = spawn('python', ['passTest.py', 'param1', 'param2', 'param3', 'param4']);
=======
passTest = spawn('python', ['passTest.py']);
>>>>>>> 4f7974080d2cd64c642afec73b5f4464f46ba614

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