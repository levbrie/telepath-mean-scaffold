# MEAN SCAFFOLD
---------------------------------------------------
#### (MONGODB, EXPRESS, ANGULAR, NODE)

## Express

### Express Middleware extracted out into separate packages in Express 4

| Express 3.0     | Express 4.0 Name | Desc  |
| --------------- | -------------    | ----- |
| bodyParser      | body-parser      |  |
| compress        | compression      |  |
| cookieSession   | cookie-session   |  |
| logger          | morgan           | logging |
| cookieParser    | cookie-parser    |  |
| session         | express-session  |  |
| favicon         | static-favicon   |  |
| response-time   | response-time    |  |
| error-handler   | errorhandler     |  |
| method-override | method-override  |  |
| timeout         | connect-timeout  |  |
| vhost           | vhost            |  |
| csrf            | csurf            |  |


## Grunt Packages

| Plugin            | Description                                  |
| ----------------- | ---------------------------------------------|
| contrib-jshint    | Validate files using jshint                  |
| contrib-uglify    | Minify JS files using UglifyJS               |
| contrib-watch     | Run tasks whenever watched files are changed |
| contrib-clean     | Clean up files and folders                   |
| contrib-copy      | Copy files and folders                       |
| contrib-concat    | Combine files into a single file             |
| contrib-cssmin    | Compress CSS files                           |
| contrib-less      | Compile LESS files to CSS                    |
| contrib-imagemin  | Minify PNG, JPG, and GIFs                    |
| contrib-compass   | Compile SASS to CSS using Compass            |
| contrib-htmlmin   | Minify HTML files                            |


## MONGODB

### Importing Data into Mongo

Importing data into Mongo using JSON makes it really easy.  Just make sure you wrap the collection in an array, as in:

```javascript
[
  {
    "firstName": "Lev",
    "lastName": "Brie",
    "email": "lev@leviathante.ch"
  },
  {
    "firstName": "James",
    "lastName": "Buchanan",
    "email": "james@leviathante.ch"
  }
]
```

`$ mongoimport --db databaseName --collection collectionName --jsonArray jsonFile.js`

To remove:

```zsh
$ mongo
$ use databaseName
$ db.collectionName.remove()
```

To drop database: `$ db.dropDatabase()`

## AUTH

It is strongly recommended that anyone wishing to work with the authentication and authorization strategies at Leviathan read through [the entire guide to Passport.js](http://passportjs.org/guide/) and become as comfortable as they possibly can with token-based authentication strategies, OAuth 2.0 (Facebook, LinkedIn, Github, etc.), and openId (the authorization strategy that Google uses internally and that powers Firefox's federated login).

### Currently Leviathan apps use cookie-based authentication

Currently Leviathan apps use cookie-based authentication to authenticate the user on every request - currently this is actually only every request requiring authentication, as every route implements its own custom authorization logic for access to resources, while the client-side app has its own service for verifying identity when needed.  This has several issues which I won't get into here, not least of which is the need to extract these disparate auth actions into a single piece of middleware to be used on every request.

### Experimenting with Token-Based Authentication, see:

* https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/
* http://en.wikipedia.org/wiki/Claims-based_identity

This looks promising and like the future, but I still need to work out all of the mechanisms involved to make sure that this provides both a comprehensive and a customer-friendly solution - at first blush, it seems as if a token-based auth scheme should enable a better user experience in terms of authenticating and getting authorized, since claims-based auth can be used to authenticate against multiple applications (i.e. single sign-on) and should also therefore be capable of persisting when the application is closed as long as the browser is opened (and perhaps even beyond that as well), but there was some discussion of the closing of the current tab causing a sign-off, which would obviously not be desirable.

### Implementation in Express

Express.js uses the npm packages express-jwt and jsonwebtoken to implement the JSON Web Token standard, enabling it to serve as a Security token service (STS) for the application, although passport allows us to use other [OAuth] providers for this service as well (Google, Github, Facebook, etc.), which is preferable in terms of security:

> [To better understand the concept of security token service, consider the analogy of a night club with a doorman. The doorman wants to prevent under-age patrons from entry. To facilitate this he requests a patron to present a driver's license, health insurance card or other identification (the token) that has been issued by a trusted third party (the security token service) such as the provincial or state vehicle license department, health department or insurance company. The nightclub is thus alleviated of the responsibility of determining the patron's age. It only has to trust the issuing authority (and of course make its own judgment of the authenticity of the token presented). With these two steps completed the nightclub has successfully authenticated the patron with regard to the claim that he or she is of legal drinking age.](http://en.wikipedia.org/wiki/Claims-based_identity)

### More on Claims-based identity.

> Claims-based identity has the potential to simplify authentication logic for individual software applications, because those applications don't have to provide mechanisms for account creation, password creation, reset, and so on. Furthermore, claims-based identity enables applications to know certain things about the user, without having to interrogate the user to determine those facts. The facts, or claims, are transported in an "envelope" called a secure token.

> Claims-based identity can greatly simplify the authentication process for the user because he or she doesn't have to sign in multiple times to multiple applications. A single sign in creates the token which is then used to authenticate against multiple applications, or web sites. In addition, because certain facts (claims) are packaged with the token, the user does not have to tell each individual application those facts repeatedly - for instance, by answering similar questions or completing similar forms.

> The name "claims-based identity" can be confusing at first because it seems like a misnomer. Attaching the concept of claims to the concept of identity appears to be combining authentication (determination of identity) with authorization (what the identified subject may and may not do). However a closer examination reveals that this is not the case. Claims are not what the subject can and cannot do. They are what the subject is or is not. It is up to the application receiving the incoming claim to map the is/is not claims to the may/may not rules of the application. In traditional systems there is often confusion about the differences and similarities between what a user is/is not and what the user may/may not do. Claims-based identity makes that distinction clear.

[See Claims-Based Identity](http://en.wikipedia.org/wiki/Claims-based_identity)

### We also need to figure out how auth will be handled for sockets with socket.io or WebSockets and the token-based approach seems to be the one used by Firebase.  [An article specific to socket.io token-based auth from the same author as above](https://auth0.com/blog/2014/01/15/auth-with-socket-io/).  Socket.io has a global authorization callback and there is an npm package integrating jwt (JSON Web Tokens) with it: [socketio-jwt](https://github.com/auth0/socketio-jwt)

## GRUNT

### grunt-express-server and custom wait task

In order to ensure that the express server has time to reload on grunt watches where files change, a custom grunt wait task is registered with a set timeout so that the server has time to reload (without this, it fails to livereload in the browser).

### Implemented

### Roadmap
* auth with passport
* look into jwt (jsonwebtoken - npm jsonwebtoken, express-jwt, socketio-jwt, etc.)


### Possible npm packages:
* grunt-bower-install
* gm
* connect-mongo
* assetmanager
* async
* dependable
* consolidate
* forever
* nodemailer
* view-helpers
* helmet
* glob
* load-grunt-tasks
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* connect-mongo
* compression
* errorhandler
* [express-jwt](https://github.com/auth0/express-jwt)
* [socket.io](https://github.com/Automattic/socket.io)
* [socketio-jwt](https://github.com/auth0/socketio-jwt)
* [composable-middleware](https://github.com/randymized/composable-middleware)
* [grunt-google-cdn](https://github.com/btford/grunt-google-cdn)
* [grunt-newer](https://github.com/tschaub/grunt-newer)
* [grunt-ngmin](https://github.com/btford/grunt-ngmin)
* grunt-svgmin
* grunt-rev
* grunt-usemin[https://github.com/yeoman/grunt-usemin]
* grunt-node-inspector
* grunt-nodemon
* grunt-angular-templater
* grunt-dom-munger
* [grunt-injector](https://github.com/klei/grunt-injector)
* grunt-mocha-test
* grunt-contrib-sass
* jit-grunt
* open
* grunt-open
* supertest
* should
* [grunt-sassdoc](https://github.com/SassDoc/grunt-sassdoc)