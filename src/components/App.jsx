'use strict';
import React from 'react';
import Month from './Month.jsx';
import example from '../ExampleData.js';
import $ from 'jquery';
import t from 'tcomb-form';

//easier way to handle form without writing a whole bunch of html
const Form = t.form.Form;
const FormSchema = t.struct({
  name: t.Str,
  startTime: t.Str,
  endTime: t.Str,
  manager: t.Num,
  completed: t.Bool,
})
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			name: null
		}
	}

	componentWillMount() {
		this.setState({
			events: example
		});
	}

  onSubmit(evt) {
    evt.preventDefault()
    const value = this.refs.form.getValue()
    if (value) {
      console.log(value)
    }
  }

	render() {
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
			  	<div className = "userInputForm">
			  	<h1>Create an event</h1>
	        <form onSubmit={this.onSubmit}>
	        <t.form.Form ref="form" type={FormSchema} />
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