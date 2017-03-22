var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');
var app = express();
var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('We are connected to database test');
  db.collections['tasks'].drop();
  var i = 1;
  function addOne(i) {
    if (i === 32) {
      return;
    } else if (i < 16) {
      var first = new Task({
        Username: 'Bobs',
        Name: 'shopping',
        Start: '12:30',
        Due: '13:30',
        Project: 5
      }).save(function(err, data) {
        i++;
        addOne(i);
        return;
      });
    } else {
      var first = new Task({
        Username: 'Freds',
        Name: 'coding',
        Start: '12:30',
        Due: '13:30',
        Project: 6
      }).save(function(err, data) {
        i++;
        addOne(i);
        return;
      });
    }
  }
  addOne(i);
});

var projectSchema = new mongoose.Schema({
  id: {type: Number, default: 0},
  Due: { type: Date, default: Date.now },
  Members: Array,
  Tasks: { type: Object, ref: 'Tasks' },
  Permissions: Array
});

var userSchema = new mongoose.Schema({
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

var taskSchema = new mongoose.Schema({
  Username: {type: String},
  Name: {type: String},
  Start: {type: String},
  Due: {type: String},
  Prerequisite: Array,
  Project: {type: Number, default: 0},
});

var Task = mongoose.model('Task', taskSchema);

module.exports = {
  Task: Task
}
