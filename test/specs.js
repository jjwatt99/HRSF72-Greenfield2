var expect = require('chai').expect;
var mongoose = require('mongoose');
var db = require('../database/db.js');

describe('Database Schema:', function() {
  it('contains a tasks table', function(done) {

    db.Task.find(function (err, data) {
    	if (err) return console.log(err);
    	expect(data).to.exist;
    	done();
    });
  });

  it('contains username, name, startMonth, startDate, dueMonth, dueDate, startTime', function(done) {

    db.Task.find(function (err, data) {
    	if (err) return console.log(err);
    	expect(data[0].Username).to.exist;
    	expect(data[0].Name).to.exist;
    	expect(data[0].StartMonth).to.exist;
    	expect(data[0].StartDate).to.exist;
    	expect(data[0].DueMonth).to.exist;
    	expect(data[0].DueDate).to.exist;
    	expect(data[0].StartTime).to.exist;
    	done();
    });
  });
});

describe('Database storage:', function() {
  it('saves a new username', function(done) {
    var Fred = new db.Task({
    Username: 'Fred',
    Name: 'working',
    StartMonth: 1,
    StartDate: 1,
    DueMonth: 2,
    DueDate: 4,
    StartTime: 700,
    Prerequisites: [],
    Dependencies: [],
    Completed: false,
    Project: 5
    }).save(function (error, saved) {
    	if (error) return console.log(error);

    	db.Task.find({'Username': 'Fred'}, function (err, data) {
	    	if (err) return console.log(err);
	    	expect(data[0].Username).to.equal('Fred');
	    	done();
	    });
    });
  });

  it('saves a new task name', function(done) {
    db.Task.find({'Username': 'Fred'}, function (err, data) {
    	if (err) return console.log(err);
    	expect(data[0].Name).to.equal('working');
    	done();
    }); 
  });
});



