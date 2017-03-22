var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');
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
        DueMonth: 1,
        DueDate: i,
        StartMonth: 1,
        StartDate: i,
        StartTime: 700,
        Prerequisites: [],
        Dependencies: [],
        Completed: false,
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
        DueMonth: 1,
        DueDate: i,
        StartMonth: 1,
        StartDate: i,
        StartTime: 900,
        Prerequisites: [],
        Dependencies: [],
        Completed: false,
        Project: 5
      }).save(function(err, data) {
        i++;
        addOne(i);
        return;
      });
    }
  }
  addOne(i);
  var first = new Task({
    Username: 'Bobs',
    Name: 'eating',
    DueMonth: 1,
    DueDate: 1,
    StartMonth: 1,
    StartDate: 1,
    StartTime: 700,
    Prerequisites: [],
    Dependencies: [],
    Completed: false,
    Project: 5
  }).save();
});

// db.once('open', function() {
//   db.collections['tasks'].drop();
//   var BobsTask = new Task({
//     Username: 'Bobs',
//     Name: 'shopping',
//     DueMonth: 1,
//     DueDate: 4,
//     StartMonth: 1,
//     StartDate: 1,
//     StartTime: 700,
//     Prerequisites: [],
//     Dependencies: [],
//     Completed: false,
//     Project: 5
//     }).save( function(err, data) {
//       var first = new Task({
//       Username: 'Fred',
//       Name: 'coding',
//       DueMonth: 1,
//       DueDate: 11,
//       StartMonth: 1,
//       StartDate: 8,
//       StartTime: 900,
//       Prerequisites: [],
//       Dependencies: [],
//       Completed: false,
//       Project: 5
//       }).save( function(err, data) {
//         return;
//         });
//       });
// });


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
  DueDate: {type: String},
  DueMonth: {type: String},
  StartMonth: {type: String},
  StartDate: {type: String},
  StartTime: {type: String},
  Prerequisites: Array,
  Dependencies: Array,
  Completed: Boolean,
  Project: {type: Number, default: 0},
});

var Task = mongoose.model('Task', taskSchema);

module.exports = {
  Task: Task
}
