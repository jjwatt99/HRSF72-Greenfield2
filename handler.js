var dbase = require('./database/db.js');
var utility = require('./database/utility.js')

module.exports = {
	getUserTasks: function(username, month, callback) {
		dbase.Task.find({ 'Username' : username }, function(err, data) {
			if (err) return console.error(err);
			// if (username !== 'Manager') {
			// 	for (var i = 0; i < data.length; i++) {
			// 		if (data[i]['Username'] !== username) {
			// 			data[i]['Username'] = '';
			// 			data[i]['Name'] = '';
			// 			data[i]['Start'] = '';
			// 			data[i]['Due'] = '';
			// 			data[i]['Project'] = '';
			// 		}
			// 	}
			// }
			var sendObj = { events: utility.parseToCalendarDays(data, month) };
			callback(sendObj);
		});
	},
	addTask: function(username, newTask, callback) {
		// var taskToAdd = new dbase.Task({
		// 	Username: username,
		// 	Name: newTask.name,
		// 	Start: 
		// })
	}
}

