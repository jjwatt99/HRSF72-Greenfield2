'use strict';
import React from 'react';
import Month from './Month.jsx';
import $ from 'jquery';
import t from 'tcomb-form';
import ShowPopup from './Popup.jsx';
import MonthSelect from './MonthSelect.jsx';
import EditTaskForm from './EditTaskForm.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			name: null,
			currentMonth: '1',
			eventsFlatArray: [],
			editFormState: {
				type: 'Edit Task',
				name: '',
				startDate: '',
				startMonth: '',
				startTime: '',
				dueDate: '',
				dueMonth: '',
				completed: false,
				Prerequisites: [],
				Dependencies: [],
				_id: ''
			}
		}
		this.consoleLogState = this.consoleLogState.bind(this);
		window.consoleLogState = this.consoleLogState;
		// this.resetForm = this.resetForm.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.monthSelectHandler = this.monthSelectHandler.bind(this);
		this.autoFillEditTask = this.autoFillEditTask.bind(this)
		this.submitEditTaskForm = this.submitEditTaskForm.bind(this);
	}
	consoleLogState() {
		console.log(this.state);
	}
	componentWillMount() {
		var context = this;
		$(document).ready( function() {
			console.log('hello client calendar');
			var HOST = location.origin.replace(/^http/, 'ws')
			var ws = new WebSocket(HOST);
			window.ws = ws;
			var el = document.getElementById('server-time');
			var dataObj = {
				type: 'getUserTasks',
				username: window.username,
				password: '',
				currentMonth: context.state.currentMonth
			};
			ws.onopen = function() {
				ws.send( JSON.stringify(dataObj) );
			}
			ws.onmessage = function (msg) {
				recObj = JSON.parse(msg.data);
				el.innerHTML = 'Server time: ' + recObj.time;
				if (recObj.events) {
					context.setState({
						events: recObj.events,
						eventsFlatArray: recObj.eventsFlatArray,
						editFormState: {
							type: 'Edit Task',
							name: '',
							startDate: '',
							startMonth: '',
							startTime: '',
							dueDate: '',
							dueMonth: '',
							completed: false,
							Prerequisites: [],
							Dependencies: [],
							_id: ''
						}
					});
				}
			};
		});
	}

	resetForm() {
  	}

  	autoFillEditTask(task) {
  		for (var i = 0; i < task.Prerequisites.length; i++) {
	  		for (var j = 0; j < this.state.eventsFlatArray.length; j++) {
	  			var eventID = this.state.eventsFlatArray[j]._id;
	  			if (task.Prerequisites[i] === eventID) {
	  				task.Prerequisites[i] = this.state.eventsFlatArray[j].brief;
	  			}
	  		}
  		}
  		for (var i = 0; i < task.Dependencies.length; i++) {
	  		for (var j = 0; j < this.state.eventsFlatArray.length; j++) {
	  			var eventID = this.state.eventsFlatArray[j]._id;
	  			if (task.Dependencies[i] === eventID) {
	  				task.Dependencies[i] = this.state.eventsFlatArray[j].brief;
	  			}
	  		}
  		}
		this.setState({
			editFormState: {
				type: 'Edit Task',
				name: task.Name,
				startDate: task.StartDate,
				startMonth: task.StartMonth,
				startTime: task.StartTime,
				dueDate: task.DueDate,
				dueMonth: task.DueMonth,
				completed: task.Completed,
				Prerequisites: task.Prerequisites,
				Dependencies: task.Dependencies,
				_id: task._id
			}
		})
  	}

  	submitEditTaskForm(task) {
		var taskPrerequisites = [];
  		for (var i = 0; i < task.Prerequisites.length; i++) {
	  		for (var j = 0; j < this.state.eventsFlatArray.length; j++) {
	  			var eventBrief = this.state.eventsFlatArray[j].brief;
	  			if (task.Prerequisites[i] === eventBrief) {
	  				taskPrerequisites.push(this.state.eventsFlatArray[j]._id);
	  			}
	  		}
  		}
  		console.log('Prerequisites after processing EditTaskForm = ', taskPrerequisites)
		var taskDependencies = [];
  		for (var i = 0; i < task.Dependencies.length; i++) {
	  		for (var j = 0; j < this.state.eventsFlatArray.length; j++) {
	  			var eventBrief = this.state.eventsFlatArray[j].brief;
	  			if (task.Dependencies[i] === eventBrief) {
	  				taskDependencies.push(this.state.eventsFlatArray[j]._id)
	  			}
	  		}
  		}
		var sendObj = {
			type: 'Edit Task',
			username: window.username,
			name: task.name,
     		startDate: task.startDate,
			startMonth: task.startMonth,
			startTime: task.startTime,
			dueDate: task.dueDate,
			dueMonth: task.dueMonth,
			completed: task.completed,
			Prerequisites: taskPrerequisites || task.Prerequisites,
			Dependencies: taskDependencies || task.Dependencies,
			_id: task._id,
			currentMonth: this.state.currentMonth
		};
		window.ws.send( JSON.stringify(sendObj) );
  	}

	onSubmit(evt) {
		evt.preventDefault();
		if (this.refs.form.getValue()) {
			var userInput = this.refs.form.getValue()[0];
			console.log('this.refs.form.getValue() = ', this.refs.form.getValue())
			if (userInput) {
				if (userInput.type === "New Task") {
					if (userInput.Prerequisites) {
						var newTaskPreReq = [];
						// exchange database id's for task brief in prerequisites array
						for (var j = 0; j < userInput.Prerequisites.length; j++) {
							var eventsBrief = userInput.Prerequisites[j]
							for (var i = 0; i < this.state.eventsFlatArray.length; i++) {
								var knownEvent = this.state.eventsFlatArray[i].brief
								if (eventsBrief === knownEvent) {
									newTaskPreReq.push(this.state.eventsFlatArray[i]._id)
								}
							}
						}
					}
					if (userInput.Dependencies) {
						var newTaskDepen = [];
						// exchange database id's for task brief in Dependencies array
						for (var j = 0; j < userInput.Dependencies.length; j++) {
							var eventsBrief = userInput.Dependencies[j]
							for (var i = 0; i < this.state.eventsFlatArray.length; i++) {
								var knownEvent = this.state.eventsFlatArray[i].brief
								if (eventsBrief === knownEvent) {
									newTaskDepen.push(this.state.eventsFlatArray[i]._id)
								}
							}
						}
					}
					var sendObj = {
						type: 'addTask',
						username: window.username,
						newTask: userInput,
						newTaskPreReq: newTaskPreReq,
						newTaskDepen: newTaskDepen,
						currentMonth: this.state.currentMonth
					};
					window.ws.send( JSON.stringify(sendObj) );
				} 
			}
		}
	}

	onChange(value, path) {
		if (value[0] && 'tasks' in value[0] && value[0].tasks[0] !== undefined ) {
			console.log('selected task = ', value[0].tasks[0]);
			var selectedTask = value[0].tasks[0];
			for (var i = 0; i < this.state.eventsFlatArray.length; i++) {
				// console.log('this.state.eventsFlatArray['+i+'] = ' event)
				var event = this.state.eventsFlatArray[i];
				if (selectedTask === event.brief) {
					this.setState({ editFormState: {
						Prerequisites: event.Prerequisites,
						Dependencies: event.Dependencies
						}
					})
				}
			}
		}
	}

	monthSelectHandler(selectedMonth) {
		this.setState({ currentMonth: selectedMonth });
		console.log('SetState updated for currentMonth = ', selectedMonth);
		var dataObj = {
			type: 'getUserTasks',
			username: window.username,
			password: '',
			currentMonth: selectedMonth
		};
		ws.send( JSON.stringify(dataObj) );
	}

	render() {
		const ActionType = t.enums.of([
		  'New Task',
		  'New Project',
		  'Edit Task'
		], 'ActionType')

		const ListOfProjects = t.enums.of(this.state.eventsFlatArray.map(function(event) {
			return event.brief;
		}))

		var ListOfPrerequisites = t.enums.of(this.state.editFormState.Prerequisites)

		var ListOfDependencies = t.enums.of(this.state.editFormState.Dependencies)


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
		  Prerequisites: t.maybe(t.list(ListOfProjects)),
		  Dependencies: t.maybe(t.list(ListOfProjects)),
		}, 'AddTask')

		const EditTask = AddType.extend({
			tasks: t.list(ListOfProjects),
			name: t.Str,
			startDate: Days,
			startMonth: Months,
			startTime: t.String,
			dueDate: Days,
			dueMonth: Months,
			completed: t.Bool,
			Prerequisites: t.maybe(t.list(ListOfPrerequisites)),
			Dependencies: t.maybe(t.list(ListOfDependencies)),
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

		const Options = t.union([AddTask, AddProject, EditTask], 'Options')
	

		Options.dispatch = value => value && value.type === 'New Task' ? AddTask : value && value.type === 'Edit Task' ? EditTask : AddProject

		const Type = t.list(Options)
		
		const options = {
		};		
	  return (
	  	<div id="calendar">
	  		<div>
	  			<MonthSelect monthSelectHandler={this.monthSelectHandler} autoFillEditTask={this.autoFillEditTask}/>
	  		</div>
			<div className="days">Monday</div>
			<div className="days">Tuesday</div>
			<div className="days">Wednesday</div>
			<div className="days">Thursday</div>
			<div className="days">Friday</div>
			<div className="days">Saturday</div>
			<div className="days">Sunday</div>
			<div><Month month={this.state.events} autoFillEditTask={this.autoFillEditTask}/></div>
			<div>
      		<div>
      			<EditTaskForm editFormState={this.state.editFormState} submitEditTaskForm={this.submitEditTaskForm}/>
      		</div>
		        <form onSubmit={this.onSubmit.bind(this)}>
			        <t.form.Form
			          ref="form"
			          type={Type}
			          options={options}
			          onChange={this.onChange}
			        />
			        <ShowPopup event = {'New Task'} >
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



