import React from 'react';
import Events from './Events.jsx'
import ShowPopup from './Events.jsx'

var Days = (props) => (
  <div className="box">
    {props.day.map((event, index) =>
    	<Events key={index}
    		event={event}
    		autoFillEditTask={props.autoFillEditTask}
    	/>
    )}
  </div>
);

export default Days;