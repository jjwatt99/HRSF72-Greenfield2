'use strict';
import React from 'react';
import Month from './Month.jsx';
import $ from 'jquery';
import t from 'tcomb-form';
import ShowPopup from './Popup.jsx'

// import Boring from '../../react-client/src/components/boringStuff.js'
// console.log(Boring.Months)
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			name: null
		}
		// this.resetForm = this.resetForm.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		console.log('wtf')
	}

	componentWillMount() {
		var context = this;
		console.log('Now in componentWillMount')
		$(document).ready( function() {
			console.log('hello client calendar');
			var HOST = location.origin.replace(/^http/, 'ws')
			var ws = new WebSocket(HOST);
			window.ws = ws;
			var el = document.getElementById('server-time');
			var dataObj = {
				type: 'getUserTasks',
				username: window.username,
				password: ''
			};
			ws.onopen = function() {
				ws.send( JSON.stringify(dataObj) );
			}
			ws.onmessage = function (msg) {
				recObj = JSON.parse(msg.data);
				el.innerHTML = 'Server time: ' + recObj.time;
				if (recObj.events) {
					context.setState({
						events: recObj.events
					});
				}
			};
		});
	}

	resetForm() {
		// var value = this.refs.form.getValue();
	 //    if (value) {
		// 	console.log(value);
		// 	this.setState({value: null});
	 //    }
  	}

	onSubmit(evt) {
		evt.preventDefault();
		var userInput = this.refs.form.getValue()[0];
		// console.log('this form = ', this.refs.form)
		console.log('this.refs.form.getValue() = ', this.refs.form.getValue())
		// console.log('userInput = ', userInput);
		if (userInput) {
			if (userInput.type === "New Task") {
				var sendObj = {
					type: 'addTask',
					username: window.username,
					newTask: userInput
				};
				window.ws.send( JSON.stringify(sendObj) );
			}
		}
		// this.refs.form.reset();
	}

	render() {
		const ActionType = t.enums.of([
		  'New Task',
		  'New Project'
		], 'ActionType')

		const ListOfProjects = t.enums.of([
			// Pass in an array of projects here from DB
			'Project 1',
			'Project 2',
			'Project 3',
			'Project 4',
			'Project 5',
			'Project 6',
			'Project 7'
		])

		const AddType = t.struct({
		  type: ActionType
		}, 'AddType')

		const AddTask = AddType.extend({
		  name: t.Str,
		  startDate: Days,
		  startMonth: Months,
		  startTime: t.String,
		  dueDate: Days,
		  dueMonth: Months,
		  completed: t.Bool,
		  Prerequesites: t.maybe(t.list(ListOfProjects)),
		  Dependencies: t.maybe(t.list(ListOfProjects)),
		}, 'AddTask')

		const AddProject = AddType.extend({
		  name: t.Str,
		  startDate: Days,
		  startMonth: Months,
		  startTime: t.String,
		  dueDate: Days,
		  dueMonth: Months,
		  manager: t.maybe(t.Str),
		}, 'AddProject')

		const Options = t.union([AddTask, AddProject], 'Options')
	

		Options.dispatch = value => value && value.type === 'New Task' ? AddTask : AddProject

		const Type = t.list(Options)
		
		const options = {
		};		
	  return (
	  	<div id="calendar">
	  	  <div className="days">Monday</div>
	  	  <div className="days">Tuesday</div>
	  	  <div className="days">Wednesday</div>
	  	  <div className="days">Thursday</div>
	  	  <div className="days">Friday</div>
	  	  <div className="days">Saturday</div>
	  	  <div className="days">Sunday</div>
		  	<div><Month month={this.state.events}/></div>
			  	<div>
        <form onSubmit={this.onSubmit.bind(this)}>
        <t.form.Form
          ref="form"
          type={Type}
          options={options}
        />
        <ShowPopup event = {'brah'} >
        </ShowPopup>
        <div className="form-group">
          <button 
	          type="submit" 
	          className="btn btn-primary"
	          onClick={this.resetForm}>
		          Save
	          </button>
        </div>
      </form>
      </div>
		  </div>	
	  );
	}
}

export default App;



const Months = t.enums({
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
});

const Days = t.enums({
	1:1,
	2:2,
	3:3,
	4:4,
	5:5,
	6:6,
	7:7,
	8:8,
	9:9,
	10:10,
	11:11,
	12:12,
	13:13,
	14:14,
	15:15,
	16:16,
	17:17,
	18:18,
	19:19,
	20:20,
	21:21,
	22:22,
	23:23,
	24:24,
	25:25,
	26:26,
	27:27,
	28:28,
	29:29,
	30:30,
	31:31
})