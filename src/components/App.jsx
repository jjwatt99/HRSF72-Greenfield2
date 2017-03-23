'use strict';
import React from 'react';
import Month from './Month.jsx';
import $ from 'jquery';
import t from 'tcomb-form';
import ShowPopup from './Popup.jsx';
import MonthSelect from './MonthSelect.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			name: null,
			currentMonth: '1',
			eventsFlatArray: []
		}
		// this.resetForm = this.resetForm.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.monthSelectHandler = this.monthSelectHandler.bind(this);
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
						eventsFlatArray: recObj.eventsFlatArray
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
		console.log('this.refs.form.getValue() = ', this.refs.form.getValue())
		if (userInput) {
			if (userInput.type === "New Task") {
				var sendObj = {
					type: 'addTask',
					username: window.username,
					newTask: userInput,
					currentMonth: this.state.currentMonth
				};
				window.ws.send( JSON.stringify(sendObj) );
			}
		}
		// this.refs.form.reset();
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
		  'New Project'
		], 'ActionType')

		const ListOfProjects = t.enums.of(this.state.eventsFlatArray.map(function(event) {
			return event.Name;


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
	  		<div>
	  			<MonthSelect monthSelectHandler={this.monthSelectHandler} />
	  		</div>
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



// var RenderInBody = React.createClass({

//   componentDidMount: function() {
//     this.popup = document.createElement("div");
//     document.body.appendChild(this.popup);
//     this._renderLayer();
//   },
//   componentDidUpdate: function() {
//     this._renderLayer();
//   },
//   componentWillUnmount: function() {
//     React.unmountComponentAtNode(this.popup);
//     document.body.removeChild(this.popup);
//   },
//   _renderLayer: function() {
//     React.render(this.props.children, this.popup);
//   },
//   render: function() {
//     // Render a placeholder
//     return React.DOM.div(this.props);
//   }

// });