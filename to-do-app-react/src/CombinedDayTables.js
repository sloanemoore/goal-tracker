import { set } from "date-fns";
import React, {useState, useEffect} from "react";
import DayTable from "./DayTable.js";

export default function CombinedDayTables(props) {
    const {selectedDate, toDoList, setToDoList, daysOfWeekArr, setDaysOfWeekArr} = props;

    useEffect(() => {
        const dateParts = selectedDate.split("-").map((item, i) => {
            if (i === 1) {
              return Number(item) -1;
            } else {
              return Number(item)
            }
          });
        const convertedCurrentDate = new Date(...dateParts);
        if (!isNaN(convertedCurrentDate)) {
            const convertedCurrentDate = new Date(...dateParts);
            // console.log(convertedCurrentDate.toDateString());
            let dates = [convertedCurrentDate.toDateString()];
            for (let i=0; i < 6; i++) {
                const newDate = new Date (dates[i]);
                const nextNewDate = new Date(newDate);
                nextNewDate.setDate(newDate.getDate() + 1);
                dates = ([...dates, nextNewDate.toDateString()]);
            }
        setDaysOfWeekArr(dates);
        }
    }, [selectedDate]);

    // console.log(daysOfWeekArr);
    // setDaysOfWeekArr(daysOfWeekArr);
    // console.log(daysOfWeekArr);

    return (
        <>
        {/* {!isNaN(convertedCurrentDate) && "hi!"} */}
        {daysOfWeekArr.length !== 0 && daysOfWeekArr.map((day, i) => {
            // console.log(day);
            return <DayTable currentDate={day} key={i} toDoList={toDoList} setToDoList={setToDoList}/>
        })}
        </>
    )
}
