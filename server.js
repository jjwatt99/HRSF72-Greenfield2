'use strict'; 


const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database/db.js')

const PORT = process.env.PORT || 3000;
const CLIENT_FILES = path.join(__dirname, './public');
const server = express()
.use(express.static(CLIENT_FILES))
.listen(PORT, () => {
	console.log('\n\n\n\n\n   (((((((((  WELCOME TO OnQ SERVER  )))))))))  ');
	console.log(`Listening on ${ PORT }`);
	console.log('\n\n\n\n\n');
	});
console.log(PORT)
const WSserver = new SocketServer({ server });

WSserver.on('connection', (client) => {
	var clientID = client.upgradeReq.rawHeaders[21].slice(0,5);
	console.log('\n' + clientID + ' <---- connected');
	var sendObj = {};
	sendObj.user = {};
	sendObj.user.loginOk = false;
	sendObj.events = example;
	sendObj.time = new Date().toTimeString();
	client.send( JSON.stringify(sendObj) );

	client.on('message', (recObj)=> {
		recObj = JSON.parse(recObj);
		console.log('\n' + clientID + ' attempting to update ');
		if (recObj.username.length > 0 && recObj.password.length > 0) {
			sendObj.user.loginOk = true;
			client.send( JSON.stringify(sendObj) );
		}
		});

	client.on('close', ()=> {
		console.log('\n' + clientID, ' <------ disconnected');
		// clearInterval(oneSetInterval); 
		});

	// var oneSetInterval = setInterval( ()=> {
	// 	sendObj.time = new Date().toTimeString();
	// 	client.send( JSON.stringify(sendObj) );
	// 	}, 1000);
	
});



var example = [
	[{date: 1}, {first: 'study'}, {second: 'eat'}, {third: 'party'}],
	[{date: 2}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 3}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 4}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 5}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 6}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 7}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 8}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 9}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 10}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 11}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 12}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 13}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 14}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 15}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 16}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 17}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 18}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 19}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 20}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 21}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 22}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 23}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 24}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 25}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 26}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 27}, {first: 'work'}, {second: 'eat'}, {third: 'party'}],
	[{date: 28}, {first: 'work'}, {second: 'eat'}, {third: 'party'}]
];

