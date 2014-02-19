'use strict';

module.exports = Priority;
var priorities = global.nss.db.collection('priorities');
var Mongo = require('mongodb');

function Priority(priority){
  this._id = priority._id;
  this.name = priority.name;
  this._value = parseInt(priority.value);
}

Priority.prototype.save = function(fn){
  var self = this;

  if(this._id){
    priorities.save({_id:this._id}, this, function(err,record){
      fn(new Priority(record));
    });
  }

  else{
    Priority.findByName(this.name, function(priority){
      if(!priority){
        priorities.save(self, function(err, record){
          fn(err);
        });
      }else{
        fn(new Error('Duplicate Priority'));
      }
    });
  }
};

Priority.findAll = function(fn){
  priorities.find().toArray(function(err, records){
    fn(records);
  });
};

Priority.findByName = function(name, fn){
  priorities.findOne({name:name}, function(err, record){
    fn(record ? new Priority(record) : null);
  });
};

Priority.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  priorities.findOne({_id:_id}, function(err, record){
    fn(record ? new Priority(record) : null);
  });
};

Object.defineProperty(Priority.prototype, 'value', {
  get: function(){return this._value;},
  set: function(value){this._value = parseInt(value);}
});

Priority.deleteById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  priorities.remove({_id:_id}, function(err, count){
    fn(count);
  });
};
