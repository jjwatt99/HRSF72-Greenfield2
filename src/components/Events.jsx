
import React from 'react';
import ShowPopup from './Popup.jsx'

var Events = (props) => {
  return (
    <div>
      <button>{props.event.calendarDate}</button>
      {props.event.calendarDate && 
        <ShowPopup event = {props.event.Name}/>
      }
    </div>
  );
};

export default Events;