(function() {
  'use strict';

  var mongoose = require('mongoose'),
//      encrypt  = require('../../auth/encryption'),
      qs       = require('querystring'),
      bcrypt   = require('bcryptjs'),
      jwt      = require('jwt-simple'),
//      simplReq = require('request'),
      Schema   = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;

  var userSchema = mongoose.Schema({
    email:          {type:String, required:'{PATH} is required!', unique:true},
//    salt:           {type:String, required:'{PATH} is required!'},
//    hashedPassword: {type:String, required:'{PATH} is required!'},
    password:       {type:String, required:'{PATH} is required!'},
    role:           {type:String, required:'{PATH} is required!', default: 'user'},
    firstName:      {type:String, required:'{PATH} is required!'},
    lastName:       {type:String, required:'{PATH} is required!'},
    provider:       {type:String, required:'{PATH} is required!'},
    displayName:    String,
    facebook:       {},
    github:         {},
    google:         {},
    linkedin:       {}
  });

  userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
      return next();
    }
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  });

  userSchema.methods = {
    comparePassword: function(passwordToMatch, done) {
      bcrypt.compare(passwordToMatch, this.password, function(err, isMatch) {
        done(err, isMatch);
      });
    }
//    authenticate: function(passwordToMatch) {
//      return encrypt.hasPwd(this.salt, passwordToMatch) === this.hashedPassword;
//    },
//    hasRole: function(role) {
//      return this.role === role;
//    }
  };

  var User = mongoose.model('User', userSchema);
}());