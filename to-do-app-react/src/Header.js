import React, {useState} from "react";
import 'date-fns';

// you'll need to include this function into all components
function deepFreeze (o) {
    Object.freeze(o);
  
    Object.getOwnPropertyNames(o).forEach(function (prop) {
      if (o.hasOwnProperty(prop)
      && o[prop] !== null
      && (typeof o[prop] === "object" || typeof o[prop] === "function")
      && !Object.isFrozen(o[prop])) {
        deepFreeze(o[prop]);
      }
    });
    
    return o;
  };


export default function Header(props) {
    const {selectedDate} = props;

    return (
        <>
        <div className="inline weekHeader">
            <h2 className="inline">Week of</h2>
            <input className="inline dateField" selecteddate={selectedDate} type="date" onChange={props.onSelectedDateChange}/>
        </div>

        </>
    )}
