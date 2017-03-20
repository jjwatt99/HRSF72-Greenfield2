var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');
var app = express();
var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var Project = mongoose.Schema({
  id: {type: Number, default: 0},
  Due: { type: Date, default: Date.now },
  Members: Array,
  Tasks: { type: Object, ref: 'Tasks' },
  Permissions: Array
})


var User = mongoose.Schema({
  id: {type: Number, default: 0},
  username: {
    type: String, 
    unique: true
  },
  password: String,
  name: {
    first: { type: String, default: '' },
    last: { type: String, default: '' },
  },
  groups: [{ type: String, ref: 'Project' }],
  permissions: [{
    name: String,
    permit: Boolean
  }], 
  Role: String,
  Manager: String,
  Tasks: { type: Object, ref: 'Tasks' },
});

var Tasks = mongoose.Schema({
	Due: { type: Date, default: Date.now },
	Prerequisite: Array,
	Project: {
    _id: {type: Number, default: 0}
  },
  timeCreated: {
    type: Date,
    default: Date.now
  }
})



// var Item = mongoose.model('Item', itemSchema);

// var selectAll = function(callback) {
//   Item.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// var selectAll = function(callback) {
//   Item.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// module.exports = Item;


