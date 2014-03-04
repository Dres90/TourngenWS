var fs = require('fs');

module.exports.host = 'localhost';
module.exports.database = 'tourngen';
module.exports.user = 'root';
module.exports.password = '';
module.exports.certificate = {
  key: fs.readFileSync('keys/key.pem'),
  cert: fs.readFileSync('keys/cert.pem')
};