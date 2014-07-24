### MEAN SCAFFOLD (MONGODB, EXPRESS, ANGULAR, NODE)

| Express Middleware | Are           | Cool  |
| ------------- |:-------------:| -----:|
| body-parser      | right-aligned | $1600 |
| compression    | centered      |   $12 |
| cookie-session | are neat      |    $1 |
| cookie-parser

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
* (jsonwebtoken)[https://github.com/auth0/node-jsonwebtoken]
* connect-mongo
* compression
* errorhandler
* (express-jwt)[https://github.com/auth0/express-jwt]
* (socket.io)[https://github.com/Automattic/socket.io]
* (socketio-jwt)[https://github.com/auth0/socketio-jwt]
* (composable-middleware)[https://github.com/randymized/composable-middleware]
* (grunt-google-cdn)[https://github.com/btford/grunt-google-cdn]
* (grunt-newer)[https://github.com/tschaub/grunt-newer]
* (grunt-ngmin)[https://github.com/btford/grunt-ngmin]
* grunt-svgmin
* grunt-rev
* grunt-usemin[https://github.com/yeoman/grunt-usemin]
* grunt-node-inspector
* grunt-nodemon
* grunt-angular-templater
* grunt-dom-munger
* grunt-asset-injector
* grunt-mocha-test
* grunt-contrib-sass
* jit-grunt
* open
* grunt-open
* supertest
* should
* (grunt-sassdoc)[https://github.com/SassDoc/grunt-sassdoc]