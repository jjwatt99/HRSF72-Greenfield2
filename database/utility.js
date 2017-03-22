module.exports = {
	daysPerMonth: {
		1: 31,
		2: 28,
		3: 31,
		4: 30,
		5: 31,
		6: 30,
		7: 31,
		8: 31,
		9: 30,
		10: 31,
		11: 30,
		12: 31
	},
	parseToCalendarDays: function(tasksArray, month) {
		var indexedTasksForMonth = [];
		for (var i = 1; i <= module.exports.daysPerMonth[month]; i++) {
			for (var j = 0; j < tasksArray.length; j++ ) {
				var day = [{calendarDate: i}];
				var task = tasksArray[j];
				if ( task.StartDate <= i && task.DueDate >= i ) {
					day.push(task);
				}
				// month.push([{date: i+1}, tasksArray[i]]);
			}
			indexedTasksForMonth.push(day);
		}
		return indexedTasksForMonth;
	}
}