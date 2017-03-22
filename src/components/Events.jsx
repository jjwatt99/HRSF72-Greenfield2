
import React from 'react';
import ShowPopup from './Popup.jsx'

var Events = (props) => {
	// console.log(props.event.calendarDate);
  return (
    <div>
      <button>{props.event.calendarDate}</button>
      {props.event.Name && 
        <ShowPopup event = {props.event.Name}/>
      }
    </div>
  );
};

export default Events; 