import React from 'react';
import ShowPopup from './Popup.jsx'

var Events = (props) => {
  return (
    <div>
      <div>{props.event.calendarDate}</div>
      <form onClick={()=> props.autoFillEditTask(props.event)}>
        {props.event  &&
          props.event.Name
        }
      </form>
    </div>
  );
};

export default Events; 
