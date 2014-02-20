var fs = require('fs');

module.exports.host = '192.241.248.184';
module.exports.database = 'tourngen';
module.exports.user = 'tourngen';
module.exports.password = 'PokemonDigimon';
module.exports.certificate = {
  key: fs.readFileSync('keys/key.pem'),
  cert: fs.readFileSync('keys/cert.pem')
};