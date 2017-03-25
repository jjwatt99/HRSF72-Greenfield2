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
				console.log('username = ', username, 'month = ', month, 'data = ', data)
				var sendEvents =  utility.parseToCalendarDays(data, month);
				var eventsFlatArray = utility.parseDependenciesShow(data);
				var sendObj = { events: sendEvents, eventsFlatArray: eventsFlatArray };
				callback(sendObj);
			});
	},
	addTask: function(username, taskParams, Prereqs, Depens, month, callback) {
		// var DependenciesArray = utility.getDependencies(taskParams.brief)
		// console.log(DependenciesArray);
		console.log(taskParams.Prerequisites);
		var newTask = new dbase.Task({
			Username: username,
			Name: taskParams.name,
			StartMonth: taskParams.startMonth,
			StartDate: taskParams.startDate,
			DueMonth: taskParams.dueMonth,
			DueDate: taskParams.dueDate,
			StartTime: taskParams.startTime,
			Prerequisites: Prereqs || [],
			Dependencies: Depens || [],
			Completed: taskParams.completed || false
		}).save( function(err) {
			if (err) return console.error(err);
			module.exports.getUserTasks(username, month, callback);
		});
	},
	editTask: function(username, id, month, taskName, startDate, startMonth, startTime, dueDate, dueMonth, completed, Prerequisites, Dependencies, callback ) {
		dbase.Task.update(
			{ _id: id }, 
			{$set: { 	Name: taskName,
						StartMonth: startMonth,
						StartDate: startDate,
						StartTime: startTime,
						DueMonth: dueMonth,
						DueDate: dueDate,
						Prerequisites: Prerequisites,
						Dependencies: Dependencies,
						Completed: completed
				 }}, 
			function(err) {
				if (err) return console.error(err);
				module.exports.getUserTasks(username, month, callback);
			});
	}
}

