var dbase = require('./database/db.js');
var utility = require('./database/utility.js')

module.exports = {
	getUserTasks: function(username, month, callback) {
		dbase.Task.find({ 'Username' : username }, function(err, data) {
			if (err) return console.error(err);
			var sendObj = { events: utility.parseToCalendarDays(data, month) };
			callback(sendObj);
		});
	},
	addTask: function(username, newTask, callback) {
		
	}
}

