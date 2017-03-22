module.exports = {
	parseToCalendarDays: function(tasksArray) {
		var month = [];
		for (var i = 0; i < tasksArray.length; i++ ) {
			// var day = [];
			// if ( tasksArray[i] === 
			month.push([{date: i+1}, tasksArray[i]]);
		}
		return month;
	}
}