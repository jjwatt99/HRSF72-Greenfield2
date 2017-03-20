import React from 'react';
import Month from './Month.jsx';
import example from '../ExampleData.js';
import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
		}
	}

	componentWillMount() {
		this.setState({
			events: example
		});
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
		  </div>	
	  );
	}
}

export default App;