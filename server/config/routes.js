// var auth =          require('./auth'),           // for user authentication
    // users =         require('../controllers/users'),
    // uploads =       require('../controllers/uploads'),
    // projects =      require('../controllers/projects'),
    // mailboxes =     require('../controllers/mailboxes'),
var mongoose =      require('mongoose'),
    User =          mongoose.model('User'),
    clientViews =         require('./routes/clientViews');  // for view partial routing


module.exports = function(app) {

  // see https://github.com/auth0/angular-token-auth/blob/master/auth.server.js
  app.use(function(err, req, res, next){
    if (err.constructor.name === 'UnauthorizedError') {
      res.send(401, 'Unauthorized');
    }
  });

  // app.post('/authenticate', function (req, res) {
  //   //TODO validate req.body.username and req.body.password
  //   //if is invalid, return 401
  //   if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
  //     res.send(401, 'Wrong user or password');
  //     return;
  //   }

  //   var profile = {
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     email: 'john@doe.com',
  //     id: 123
  //   };

  //   // We are sending the profile inside the token
  //   var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

  //   res.json({ token: token });
  // });
  // end methods taken from https://github.com/auth0/angular-token-auth/blob/master/auth.server.js
  // on token-enabled auth in angular


  app.route('/api/hello')
    .get(function(req, res) {
      res.send('hello there!');
    })
    .post(function(req, res) {
      console.log('processing a post request');
      res.send('processing post to hello');
    });

  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  app.use('/auth', require('../auth/passport'));

  // alternatively could use clientViews.viewIndex
  // or this:
  // app.get('*', function(req, res) {
  //   res.sendfile('./public/app/index.html');
  // });

  // i think the below is the express 4 way to do it though
  app.route('/*')
    .get(function(req, res) {
      res.sendfile('./public/app/index.html');
    });

};