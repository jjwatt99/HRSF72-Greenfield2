
var app = {
	init: function() {
		$(document).ready( function() {
			console.log('hello client');
			var HOST = location.origin.replace(/^http/, 'ws')
			var ws = new WebSocket(HOST);
			var el = document.getElementById('server-time');
			ws.onmessage = function (msg) {
					recObj = JSON.parse(msg.data);
					el.innerHTML = 'Server time: ' + recObj.time;
			};

			$('#loginForm').submit( function(event) {
				event.preventDefault();
				var username = $(username).val();
				var password = $(password).val();
				var dataObj = {
					usermame: username,
					password: password,
				};
				ws.send( JSON.stringify(dataObj));
			});

		});
	}
};

app.init();