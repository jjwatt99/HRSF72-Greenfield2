
import React from 'react';
import ShowPopup from './Popup.jsx'

var Events = (props) => {
  return (
    <div>
      {props.event.date && 
        <ShowPopup event = {props.event.Name}/>
      }
      <button>{props.event.date}</button>
      <button>{props.event.Name}</button>
    </div>
  );
};

export default Events;