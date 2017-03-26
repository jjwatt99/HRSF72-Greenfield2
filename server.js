'use strict'; 


const path = require('path');
const CLIENT_FILES = path.join(__dirname, './public');

const SocketServer = require('ws').Server;
var http = require("http");
const express = require('express');
const app = express()
.use(express.static(CLIENT_FILES));


const PORT = process.env.PORT || 3000;
var server = http.createServer(app)
.listen(PORT, () => {
	console.log('\n\n\n\n\n   (((((((((  WELCOME TO OnQ SERVER  )))))))))  ');
	console.log(`Listening on ${ PORT }`);
	console.log('\n\n\n\n\n');
	});
const bodyParser = require('body-parser');
const db = require('./database/db.js')

const WSserver = new SocketServer({ server: server });
const handler = require('./handler');

WSserver.on('connection', (client) => {
	var clientID = client.upgradeReq.rawHeaders[21].slice(0,5);
	console.log('\n' + clientID + ' <---- connected');
	var sendObj = {
		user: {loginOk: false}
	};
	sendObj.time = new Date().toTimeString();
	client.send( JSON.stringify(sendObj) );


	client.on('message', (recObj)=> {
		recObj = JSON.parse(recObj);
		console.log('\n' + clientID + ' attempting to update ');
			if ( recObj.type === 'login' && recObj.username.length > 0 && recObj.password.length > 0) {
				console.log('Login ClientID: ', clientID, ' is username: ', recObj.username);
				sendObj.user.loginOk = true;
				client.send( JSON.stringify(sendObj) );
			}
			if ( recObj.type === 'getUserTasks') {
				console.log('username: ', recObj.username, ' is seeking update for month ', recObj.currentMonth);
				handler.getUserTasks(recObj.username, recObj.currentMonth, function(tasks) {
					client.send( JSON.stringify(tasks) );
				});
			}
			if ( recObj.type === 'addTask' ) {
				console.log('addTask ClientID: ', clientID, ' is username: ', recObj.username);
				handler.addTask(recObj.username, recObj.newTask, recObj.newTaskPreReq, recObj.newTaskDepen, recObj.currentMonth, function(tasks) {
					client.send( JSON.stringify(tasks) );
				})
			}
			if ( recObj.type === 'Edit Task' ) {
				console.log('Edit Task ClientID: ', clientID, ' is username: ', recObj.username, ' Edit Task received object = ', recObj);
				handler.editTask(recObj.username, recObj._id, recObj.currentMonth, recObj.name, recObj.startDate, recObj.startMonth, recObj.startTime, recObj.dueDate, recObj.dueMonth, recObj.completed, recObj.Prerequisites, recObj.Dependencies, function(tasks) {
					client.send( JSON.stringify(tasks) );
				})
			}
		});

	client.on('close', ()=> {
		console.log('\n' + clientID, ' <------ disconnected');
		clearInterval(oneSetInterval); 
		});

	var oneSetInterval = setInterval( ()=> {
		sendObj.time = new Date().toTimeString();
		client.send( JSON.stringify(sendObj) );
		}, 1000);
	
});

