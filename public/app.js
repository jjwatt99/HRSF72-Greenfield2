
var app = {
	init: function() {
		$(document).ready( function() {
			console.log('hello client login');
			var HOST = location.origin.replace(/^http/, 'ws')
			var ws = new WebSocket(HOST);
			var el = document.getElementById('server-time');
			ws.onmessage = function (msg) {
					recObj = JSON.parse(msg.data);
					console.log(recObj.time);
					el.innerHTML = 'Server time: ' + recObj.time;
					if (recObj.user.loginOk === true) {
						console.log(recObj.user.loginOk);
						$("body").load("application.html");
						ws.close();
					}
			};

			$('#submit').click( function(event) {
				event.preventDefault();
				var username = $("#username").val();
				var password = $("#password").val();
				var dataObj = {
					type: 'login',
					username: username,
					password: password
				};
				ws.send( JSON.stringify(dataObj));
			});

		});
	}
};

app.init();