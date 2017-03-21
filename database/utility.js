module.exports = {
	parseToCalendarDays: function(tasksArray) {
		var daysArray = [];
		for (var i = 0; i < tasksArray.length; i++ ) {
			daysArray.push([{date: i}, tasksArray[i]]);
		}
		return daysArray;
	}
}