'use strict';

var Movie = require('../models/movie');
var mongodb = require('mongodb');

exports.create = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  var movie = new Movie(req.body);
  movies.insert(movie, function(err, records){
    res.send(records[0]);
  });
};

exports.index = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  movies = movies.find().toArray(function(err, movies){
    res.send({movies:movies});
  });
};

exports.deleteMovie = function(req, res){
  var db = req.app.locals.db;
  var id = new mongodb.ObjectID(req.params.id);
  var movies = db.collection('movies');
  console.log(req.params.id);
  console.log(id);
  
  movies.remove({_id: id}, function(err, count){
    console.log(count);
    res.send({});
  });
};


