var express         = require('express'),
    session         = require('express-session'),
    ejs             = require('ejs'),
    morgan          = require('morgan'),
    MORGAN_FORMAT   = 'dev',
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    expressJwt      = require('express-jwt'),
    jwt             = require('jsonwebtoken'),
    passport        = require('passport');

module.exports = function(app, config, env) {
  // setup static route handling
  app.set('views', config.rootPath + '/public/app');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(express.static(config.rootPath + '/public'));   // set the static files location /public/img will be /img for users
  app.use(morgan(MORGAN_FORMAT));   // log every request to the console, I've also seen app.use(morgan('dev'));

  // app.use(cookieParser());
  app.use(methodOverride());     // simulate DELETE and PUT


  // protect /api routes with JSON Web Token (Token-Based Auth using a
  // claims-based approach between parties)
  // not sure I can call use on the /api routes here like this
  // last time we waited until we were in the routes, but maybe this just
  // registers the middleware
  // and this is where we implemented cookie-based auth before so...
//  app.use('/api', expressJwt({secret: process.env.APP_SECRET}));
  app.use(bodyParser.json());    // parse json
  app.use(session({
    secret: process.env.APP_SECRET,
    saveUninitialized: true,
    resave: true
  }));
  app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
  app.use(passport.initialize());
  // expressSession.session() must be called before passport.session()
  app.use(passport.session());
  // app.use(expressSession({ secret: 'secreto secreto' }));  // secret for passport





  // if (env === 'development') {
  //   app.use(errorHandler());
  // }
};
