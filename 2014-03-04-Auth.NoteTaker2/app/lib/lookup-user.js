//
'use strict';


module.exports = function(req, res, next){
  var User = require('../models/user');
  User.findById(req.session.userId, function(user){
    res.locals.user = user;  // res.locals is a "suitcase" anything can be placed into and used down stream in the pipeline
    next();
  });
};
