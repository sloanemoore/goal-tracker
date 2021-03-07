import React, {useState, useEffect} from "react";
import DayTable from "./DayTable.js";
import Notes from "./Notes.js";

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


export default function CombinedDayTables(props) {
    const {selectedDate, toDoList, setToDoList, daysOfWeekArr, setDaysOfWeekArr, weekDates} = props;


    return (
        <>
        {daysOfWeekArr.length !== 0 && daysOfWeekArr.map((day, i) => {
            return (
            <>
            <div className="flexContainer">
                <DayTable className="flexMain" currentDate={day} index={i} toDoList={toDoList} setToDoList={setToDoList}/>
                <Notes className="flexSide" currentDate={day} index={i} toDoList={toDoList} setToDoList={setToDoList}/>
            </div>
            </>
            )
        })}
        </>
    )
}
