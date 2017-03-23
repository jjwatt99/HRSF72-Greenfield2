
import React from 'react';
import ShowPopup from './Popup.jsx'

var Events = (props) => {
  return (
    <div>
      <div>{props.event.calendarDate}</div>
    	<div>{props.event.brief}</div>
    </div>
  );
};

export default Events; 