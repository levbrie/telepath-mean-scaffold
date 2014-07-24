var express  = require('express'),
    morgan          = require('morgan'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'); //,
    // passport = require('passport');

module.exports = function(app, config, env) {
  // setup static route handling
  // app.set('views', config.rootPath + '/public/app');
  // app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(express.static(config.rootPath + '/client'));   // set the static files location /public/img will be /img for users
  app.use(morgan('combined'));   // log every request to the console, I've also seen app.use(morgan('dev'));
  app.use(bodyParser());         // pull information from html in POST
  app.use(bodyParser.json());    // parse json
  // app.use(cookieParser());
  app.use(methodOverride());     // simulate DELETE and PUT
  // app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
  // app.use(expressSession({ secret: 'secreto secreto' }));  // secret for passport



  // app.use(passport.initialize());
  // app.use(passport.session());

  // if (env === 'development') {
  //   app.use(errorHandler());
  // }
};