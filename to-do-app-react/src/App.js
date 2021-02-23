import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Header from "./Header.js";
import WeekTable from "./WeekTable.js";
import CombinedDayTables from "./CombinedDayTables.js";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  // const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  // console.log(selectedDate);

  const [toDoList, setToDoList] = useState([]);

  const [taskCounter, setTaskCounter] = useState(0);

  const [daysOfWeekArr, setDaysOfWeekArr] = useState([]);

  // useEffect(() => console.log({toDoList}), [selectedDate]); // may want to add this back in


  useEffect(() => {
    // console.log({selectedDate});
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
        let weekDates = [convertedCurrentDate.toDateString()];
        let placeholderToDoList = [...toDoList];
        for (let i=0; i < 6; i++) {
            const newDate = new Date (weekDates[i]);
            const nextNewDate = new Date(newDate);
            nextNewDate.setDate(newDate.getDate() + 1);
            weekDates = ([...weekDates, nextNewDate.toDateString()]);
        }
    // console.log({weekDates});
    // this is where new dateObj added to task
    // console.log("selected Date Change", {weekDates});
    toDoList.map(item => {
      // console.log("item dates", item.dates);
      let dateObj = {};
      for (let i=0; i<weekDates.length; i++) {
        let day = weekDates[i];
        // console.log("weekday Dates", weekDates[i]);
        dateObj[day] = {
          dayGoalTime: 0,
          dayActualTime: 0,
          dayDone: false,
          dayChecked: false
        }
      }
      // console.log({dateObj});
      for (let i=0; i<placeholderToDoList.length; i++) {
        placeholderToDoList[i]["dates"] = dateObj;
        // console.log({placeholderToDoList});
      }
    })
    setDaysOfWeekArr(weekDates);
    setToDoList([...placeholderToDoList])
    }
  }, [selectedDate]);  


  // useEffect(() => {
  //   console.log("selected Date Change", {daysOfWeekArr});
  //   toDoList.map(item => {
  //     console.log(item.dates);
  //     if (item.dates === {}) {
  //       let dateObj = {};
  //       for (let i=0; i<daysOfWeekArr.length; i++) {
  //         let day = daysOfWeekArr[i];
  //         dateObj[day] = {
  //           dayGoalTime: 0,
  //           dayActualTime: 0,
  //           dayDone: false,
  //           dayChecked: false
  //         }
  //       }
  //       console.log({dateObj});
  //     }
  //   })
  // }, [selectedDate]);

  useEffect(() => console.log("useEffect", {daysOfWeekArr}))
  useEffect(() => console.log({toDoList}))

  function handleSelectedDateChange(event) {
    // console.log(event.target.value);
    // console.log(typeof(event.target.value));
    setSelectedDate(event.target.value);
  }




  function handleAddNewRowClick () {
    // console.log("add new row clicked!");
    // console.log({toDoList});
    // console.log(typeof(toDoList));
    let dateObj = {};
    // console.log({daysOfWeekArr})
    if (daysOfWeekArr.length !== 0) {
      for (let i=0; i < daysOfWeekArr.length; i++) {
        let day = daysOfWeekArr[i];
        // console.log(day);
        dateObj[day] = {
          dayGoalTime: 0,
          dayActualTime: 0,
          dayDone: false,
          dayChecked: false
          }
         }
    }
    // console.log(dateObj);
    let newItem = {
      task: "",
      goal: null,
      actual: null,
      toGo: null,
      dates: dateObj,
      key: taskCounter,
    }
    // toDoList.push(newItem);  
    setToDoList([...toDoList, newItem]);
    setTaskCounter(prevCounter => prevCounter + 1);
}



function handleEditTask(event, key) {
  // console.log("user edit!");
  const newTaskName = event.target.value;
  // console.log(newTaskName);
  // console.log(key);
  toDoList.map(item => {
      if (item.key === key) {
        item.task = newTaskName;
      }
    })
  setToDoList(toDoList);
  }


function handleDeleteIconClick(itemToDelete) {
  // console.log("delete icon clicked!");
  // console.log(itemToDelete);
  setToDoList(toDoList.filter(item => item.key !== itemToDelete.key));
  // setToDoList([...toDoList]);
}


function handleAddIconClick(item) {
  // console.log("add icon clicked!");
  const taskName = item.task;
  const key = item.key;
  // console.log(taskName);
  // console.log(key);
  toDoList.map(item => {
      if (item.key === key) {
        item.task = taskName;
      }
    })
    setToDoList([...toDoList]);
}

// console.log({toDoList}); // may want to add this back in
// console.log({daysOfWeekArr}); // may want to add this back in
console.log({toDoList}); // may want to add this back in

  return (
    <div className="App">
      <h1>To Do App</h1>
      <Header selectedDate={selectedDate} onSelectedDateChange={handleSelectedDateChange}/>
      <WeekTable toDoList={toDoList} onAddToDoItemClick={handleAddNewRowClick} onEditTaskClick={handleEditTask} onDeleteIconClick={handleDeleteIconClick} onAddIconClick={handleAddIconClick}/>
      <CombinedDayTables selectedDate={selectedDate} daysOfWeekArr={daysOfWeekArr} setDaysOfWeekArr={setDaysOfWeekArr} toDoList={toDoList} setToDoList={setToDoList}/>
      {/* <DayTable selectedDate={selectedDate}/> */}

    </div>
  );
}

export default App;
