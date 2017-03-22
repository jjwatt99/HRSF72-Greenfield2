var dbase = require('./database/db.js');
var utility = require('./database/utility.js')

module.exports = {
	getUserTasks: function(username, callback) {
		dbase.find(function(err, data) {
			// console.log('the data looks like =', data)
			if (err) return console.error(err);
			if (username !== 'Manager') {
				for (var i = 0; i < data.length; i++) {
					if (data[i]['Username'] !== username) {
						data[i]['Username'] = '';
						data[i]['Name'] = '';
						data[i]['Start'] = '';
						data[i]['Due'] = '';
						data[i]['Project'] = '';
					}
				}
			}
			if (data.length > 0) {
				// console.log('db result', data);
				var sendObj = {};
				sendObj.events = utility.parseToCalendarDays(data);
				callback(sendObj);
			} else {
				console.log('no data for user: ', username);
			}
		});
	},
	addTask: function(username, newTask, callback) {
		
	}
}

