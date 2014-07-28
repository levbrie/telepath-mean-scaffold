'use strict';

var mongoose = require('mongoose'),
    encrypt  = require('../../auth/encryption'),
    Schema   = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = mongoose.Schema({
  email:          {type:String, required:'{PATH} is required!', unique:true},
  salt:           {type:String, required:'{PATH} is required!'},
  hashedPassword: {type:String, required:'{PATH} is required!'},
  role:           {type:String, required:'{PATH} is required!', default: 'user'},
  firstName:      {type:String, required:'{PATH} is required!'},
  lastName:       {type:String, required:'{PATH} is required!'},
  provider:       {type:String, required:'{PATH} is required!'},
  facebook:       {},
  github:         {},
  google:         {},
  linkedin:       {}
});

userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hasPwd(this.salt, passwordToMatch) === this.hashedPassword;
  },
  hasRole: function(role) {
    return this.role === role;
  }
};

var User = mongoose.model('User', userSchema);