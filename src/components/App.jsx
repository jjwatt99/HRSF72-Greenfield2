'use strict';
import React from 'react';
import Month from './Month.jsx';
import $ from 'jquery';
import t from 'tcomb-form';




class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			name: null
		}
	}

	componentWillMount() {
		var context = this;
		$(document).ready( function() {
			console.log('hello client calendar');
			var HOST = location.origin.replace(/^http/, 'ws')
			var ws = new WebSocket(HOST);
			var el = document.getElementById('server-time');
			ws.onmessage = function (msg) {
				recObj = JSON.parse(msg.data);
				el.innerHTML = 'Server time: ' + recObj.time;
				context.setState({
					events: recObj.events
				})
			};
		});
	}

    onSubmit(evt) {
    evt.preventDefault()
    const v = this.refs.form.getValue()
    if (v) {
      console.log(v)
    }
  }

	render() {
		const ActionType = t.enums.of([
		  'Create a Task',
		  'Create a Project'
		], 'ActionType')

		const ListOfProjects = t.enums.of([
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
		  label: t.String,
		  name: t.Str,
		  startTime: t.Str,
		  endTime: t.Str,
		  completed: t.Bool,
		  Prerequesites: ListOfProjects,
		  Dependencies: ListOfProjects,
		}, 'AddTask')

		const AddProject = AddType.extend({
		  label: t.String,
		  name: t.Str,
		  startTime: t.Str,
		  endTime: t.Str,
		  manager: t.Num,
		}, 'AddProject')

		const Options = t.union([AddType, AddTask, AddProject], 'Options')

		Options.dispatch = value => value && value.type === 'Create a Task' ? AddTask : AddProject

		const Type = t.list(Options)
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
        <form onSubmit={this.onSubmit}>
        <t.form.Form
          ref="form"
          type={Type}
        />
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
      </div>
		  </div>	
	  );
	}
}

export default App;