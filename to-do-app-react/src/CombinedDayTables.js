import React, {useState, useEffect} from "react";
import DayTable from "./DayTable.js";
import Notes from "./Notes.js";


export default function CombinedDayTables(props) {
    const {selectedDate, toDoList, setToDoList, daysOfWeekArr, setDaysOfWeekArr, weekDates} = props;


    return (
        <>
        {daysOfWeekArr.length !== 0 && daysOfWeekArr.map((day, i) => {
            return (
            <>
            <div className="flexContainer">
                <DayTable className="flexBlock" currentDate={day} index={i} toDoList={toDoList} setToDoList={setToDoList}/>
                <Notes className="flexBlock" currentDate={day} index={i} toDoList={toDoList} setToDoList={setToDoList}/>
            </div>
            </>
            )
        })}
        </>
    )
}
