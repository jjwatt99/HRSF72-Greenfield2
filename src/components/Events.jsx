import React from 'react';

var Events = (props) => {
  return (
	  <div>
	    <div>{props.event.date}</div>
	    <div>{props.event.Start}</div>
	  </div>
	);
};

export default Events;