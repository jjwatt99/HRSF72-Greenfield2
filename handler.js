var dbase = require('./database/db.js');
var utility = require('./database/utility.js')

module.exports = {
	getUserTasks: function(username, callback) {
		dbase.find().then(
			function(data) {
			// console.log('the data looks like =', data)
				if (data) {
					// console.log('mongoose db data for user =', username, ' || data = ', data);
					var sendObj = {};
					sendObj.events = utility.parseToCalendarDays(data);
					callback(sendObj);
				} else {
					console.log('no data for user: ', username);
				}
			});
	}
}

