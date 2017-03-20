import React from 'react';
import Month from './Month.jsx';
import $ from 'jquery';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
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