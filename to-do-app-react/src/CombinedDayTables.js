import React, {useState} from "react";
import DayTable from "./DayTable.js";

export default function CombinedDayTables(props) {
    const {selectedDate, toDoList} = props;

    // console.log(typeof(selectedDate));
    // console.log(selectedDate);

    // selectedDate.split("-");
    // const selectedDateStr = new Date(props.selectedDate).toDateString();
    // console.log(selectedDateStr);
    // console.log(typeof(selectedDateStr));

    // let dateParts = selectedDate.split("-").map((item, i) => {
    //     if (i === 1) {
    //       return Number(item) - 1;
    //     } else {
    //       return Number(item)
    //     }
    //   });
      const dateParts = selectedDate.split("-").map((item, i) => {
        if (i === 1) {
          return Number(item) -1;
        } else {
          return Number(item)
        }
      });
    //   console.log(dateParts);
      const convertedCurrentDate = new Date(...dateParts);
    //   const nextNewDate = new Date(convertedCurrentDate);
    //   nextNewDate.setDate(convertedCurrentDate.getDate() + 1);
    //   console.log({convertedCurrentDate});
    //   console.log({nextNewDate});
    //   console.log(isNaN(convertedCurrentDate));

    // const daysOfWeekArr = []; // you'll need to change this back

      
    const daysOfWeekArr = []; // you'll need to change this back

      
      if (!isNaN(convertedCurrentDate)) {
        const convertedCurrentDate = new Date(...dateParts);
        daysOfWeekArr.push([convertedCurrentDate.toDateString()]); // you'll need to change this back
        for (let i=0; i < 6; i++) {
             const newDate = new Date (daysOfWeekArr[i]);
             const nextNewDate = new Date(newDate);
             nextNewDate.setDate(newDate.getDate() + 1);
             daysOfWeekArr.push(nextNewDate.toDateString()); // you'll need to change this back
        }
    }
      

    return (
        <>
        {/* {!isNaN(convertedCurrentDate) && "hi!"} */}
        {daysOfWeekArr.length !== 0 && daysOfWeekArr.map((day, i) => {
            // console.log(day);
            return <DayTable currentDate={day} key={i} toDoList={toDoList}/>
        })}
        </>
    )
}
