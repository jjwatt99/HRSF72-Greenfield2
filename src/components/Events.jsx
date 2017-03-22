
import React from 'react';
import ShowPopup from './Popup.jsx'

var Events = (props) => {
  return (
    <div>
      <div>{props.event.calendarDate}</div>
      {props.event.Name && 
        <ShowPopup event = {props.event.Name}/>
      }
    </div>
  );
};

export default Events; 