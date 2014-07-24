// var auth =          require('./auth'),           // for user authentication
//     users =         require('../controllers/users'),
//     uploads =       require('../controllers/uploads'),
//     projects =      require('../controllers/projects'),
//     mailboxes =     require('../controllers/mailboxes'),
//     mongoose =      require('mongoose'),
//     User =          mongoose.model('User'),
//     views =         require('./routes/views');  // for view partial routing


module.exports = function(app) {

  app.route('/api/hello')
    .get(function(req, res) {
      res.send('hello there!');
    })
    .post(function(req, res) {
      console.log('processing a post request');
      res.send('processing post to hello');
    });

};