import React from 'react';
import Days from './Days.jsx';

var Month = (props) => (
  <div>
    {props.month.map((day, index) =>
    	<Days key={index}
    		day={day}
    	/>
    )}
  </div>
);


export default Month;