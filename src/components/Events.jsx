
import React from 'react';
import ShowPopup from './Popup.jsx'

var Events = (props) => {
  return (
    <div>
      <div>{props.event.calendarDate}</div>
    	<div onClick={()=> props.autoFillEditTask(props.event)}>{props.event.brief}</div>
    </div>
  );
};

export default Events; 