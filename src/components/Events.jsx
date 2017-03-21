import React from 'react';

var Events = (props) => {
  return (
	  <div>
	    <div>{props.event.date}</div>
	    <div>{props.event.Name}</div>
	  </div>
	);
};

export default Events;