var dbase = require('./database/db.js');
var utility = require('./database/utility.js')

module.exports = {
	getUserTasks: function(username, month, callback) {
		dbase.Task.find(
			{ 	'Username' : username,
				'$or' : [	{'StartMonth' : month},
							{'DueMonth' : month} ]
			},
			function(err, data) {
				if (err) return console.error(err);
				var sendEvents =  utility.parseToCalendarDays(data, month);
				var sendObj = { events: sendEvents };
				callback(sendObj);
			});
	},
	addTask: function(username, taskParams, month, callback) {
		var newTask = new dbase.Task({
			Username: username,
			Name: taskParams.name,
			StartMonth: taskParams.startMonth,
			StartDate: taskParams.startDate,
			DueMonth: taskParams.dueMonth,
			DueDate: taskParams.dueDate,
			StartTime: taskParams.startTime,
			Prerequisites: taskParams.Prerequisites || 'none',
			Dependencies: taskParams.Dependencies || 'none',
			Completed: taskParams.completed || false
		}).save( function(err) {
			if (err) return console.error(err);
			module.exports.getUserTasks(username, month, callback);
		});
	}
}

