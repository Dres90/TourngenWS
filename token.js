var crypto    = require('crypto');
var text      = 'I love cupcakes';
var key       = 'abcdeg';
var algorithm = 'sha1';
var hash, hmac;

hmac = crypto.createHmac(algorithm, key);

// change to 'binary' if you want a binary digest
hmac.setEncoding('hex');

// write in the text that you want the hmac digest for
hmac.write(text);

// you can't read from the stream until you call end()
hmac.end();

// read out hmac digest
hash = hmac.read(); 

console.log(hash);