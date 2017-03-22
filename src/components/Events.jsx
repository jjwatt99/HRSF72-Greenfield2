
import React from 'react';
import ShowPopup from './Popup.jsx'

var Events = (props) => {
	console.log(props.event.calendarDate);
  return (
    <div>
      <button>{props.event.calendarDate}</button>
      {props.event.calendarDate && 
        <ShowPopup event = {props.event.calendarDate}/>
      }
    </div>
  );
};

export default Events;