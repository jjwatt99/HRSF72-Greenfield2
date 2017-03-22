
var app = {
	init: function() {
		$(document).ready( function() {
			console.log('hello client login');
			var HOST = location.origin.replace(/^http/, 'ws')
			var ws = new WebSocket(HOST);
			console.log('app revision 2')
			var el = document.getElementById('server-time');
			ws.onmessage = function (msg) {
				recObj = JSON.parse(msg.data);
				el.innerHTML = 'Server time: ' + recObj.time;
				console.log('MONGODB_URI = ', recObj.mongodbURI || 'undefined');
				console.log('PORT = ', recObj.port || 'undefined');
				if (recObj.user.loginOk === true) {
					$("body").load("application.html");
					ws.close();
				}
			};

			$('#submit').click( function(event) {
				event.preventDefault();
				window.username = $("#username").val();
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