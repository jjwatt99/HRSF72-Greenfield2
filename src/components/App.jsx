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
	  	<div>
		  	<div><Month month={this.state.events}/></div>
		  </div>	
	  );
	}
}

export default App;