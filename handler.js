var dbase = require('./database/db.js');
var utility = require('./database/utility.js')
// var mongoose = require('mongoose');


module.exports = {
	getUserTasks: function(username, month, callback) {
		dbase.Task.find(
			{ 	'Username' : username
				// '$or' : [	{'StartMonth' : month},
				// 			{'DueMonth' : month} ]
			},
			function(err, data) {
				var sendEvents =  utility.parseToCalendarDays(data, month);
				var eventsFlatArray = utility.parseDependenciesShow(data);
				var sendObj = { events: sendEvents, eventsFlatArray: eventsFlatArray };
				callback(sendObj);
			});
	},
	addTask: function(username, taskParams, Prereqs, Depens, month, callback) {	
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
		
		console.log('Prerequisites coming into editTask = ', Prerequisites)
		var EditTaskDeep = function(Prereq, Depen, callback) {
			// var lookupId = mongoose.Types.ObjectId(id.toString());
			// console.log('VVVVVVVV parameter id =', lookupId);
			dbase.Task.findById( id, function(err, data) {
				if (err) return console.error(err);
				var startMonthDiff = data.StartMonth - startMonth;
				var startDateDiff = data.StartDate - startDate;
				var dueMonthDiff = dueMonth - data.DueMonth;
				var dueDateDiff  = dueDate - data.DueDate;
				console.log('dueMonthDiff = ', dueMonthDiff, 'dueDateDiff = ', dueDateDiff)
				dbase.Task.update(	{ _id: id }, {$set: { 	Name: taskName,
															StartMonth: startMonth,
															StartDate: startDate,
															StartTime: startTime,
															DueMonth: dueMonth,
															DueDate: dueDate,
															Prerequisites: Prerequisites,
															Dependencies: Dependencies,
															Completed: completed }}, 
					function(err) {
						if (err) return console.error(err);
						var index = 0;
						var upDateAllPrereq = function (Prereq, Depen, index, callback) {
							if (index >= Prereq.length) {
								var index = 0;
								var upDateAllDependencies = function (Depen, index, callback) {
									if (index >= Depen.length) {
										module.exports.getUserTasks(username, month, callback);
										return;
									}
									dbase.Task.findById( Depen[index], function (err, depData) {
										if (err) return console.error(err);
										dbase.Task.update(	{ _id: depData._id }, {$set: { 	
																		StartMonth: parseInt(depData.StartMonth) - startMonthDiff,
																		StartDate: parseInt(depData.StartDate) - startDateDiff,
																		DueMonth: parseInt(depData.DueMonth) + dueMonthDiff,
																		DueDate: parseInt(depData.DueDate) + dueDateDiff }},
											function(err) {
												if (err) return console.error(err); 
												index = index + 1;
												upDateAllDependencies(Depen, index, callback); 
												return;	}
										);
										return;
									});
									return;
								}
								upDateAllDependencies(Depen, index, callback)
								return;
							} else {
								dbase.Task.findById( Prereq[index], function (err, prData) {
									if (err) return console.error(err);
									dbase.Task.update(	{ _id: prData._id }, {$set: { 	
																	StartMonth: parseInt(prData.StartMonth) - startMonthDiff,
																	StartDate: parseInt(prData.StartDate) - startDateDiff,
																	DueMonth: parseInt(prData.DueMonth) + dueMonthDiff,
																	DueDate: parseInt(prData.DueDate) + dueDateDiff }},
										function(err) {
											if (err) return console.error(err); 
											index = index + 1;
											upDateAllPrereq(Prereq, Depen, index, callback); 
											return;	}
									);
									return;
								});
							}
							return;
						}
						upDateAllPrereq(Prereq, Depen, index, callback);
						return;
					}
				);
			})
			return;
		}
		EditTaskDeep(Prerequisites, Dependencies, callback);
	}
	// editTask_before: function(username, id, month, taskName, startDate, startMonth, startTime, dueDate, dueMonth, completed, Prerequisites, Dependencies, callback ) {
		
	// 	var allDependencyIDs = Prerequisites.concat(Dependencies);
	// 	var upDateAllDepedencies = function(allDependencyIDs, i) {
	// 		dbase.Task.update(	{ _id: id }, {$set: { 	Name: taskName,
	// 													StartMonth: startMonth,
	// 													StartDate: startDate,
	// 													StartTime: startTime,
	// 													DueMonth: dueMonth,
	// 													DueDate: dueDate,
	// 													Prerequisites: Prerequisites,
	// 													Dependencies: Dependencies,
	// 													Completed: completed }}, 
	// 			function(err) {
	// 				if (err) return console.error(err);
	// 				dbase.Task.update()
	// 				module.exports.getUserTasks(username, month, callback);
	// 			});
	// 	}
	// 	upDateAllDepedencies();
	// }
}









