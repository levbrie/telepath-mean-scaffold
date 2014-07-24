var express         = require('express'),
    dotenv          = require('dotenv');  // call as early as possible to ensure env vars are loaded

dotenv.load();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('\n\nENV:');
console.log(env);
var app = express();
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config, env);
// require('./server/config/mongoose')(config);
// require('./server/config/passport')();
require('./server/config/routes')(app);

// sample route with a route the way we're used to seeing it
app.get('/sample', function(req, res) {
  res.send('this is a sample!');
});

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
console.log('DIRNAME: ' + __dirname + '/client');