import React from 'react';

var Events = (props) => {
  return (
	  <div>
	    <div>{props.event.date}</div>
	    <div>{props.event.first}</div>
	    <div>{props.event.second}</div>
	    <div>{props.event.third}</div>
	  </div>
	);
};

export default Events;