import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Header from "./Header.js";
import WeekTable from "./WeekTable.js";
import CombinedDayTables from "./CombinedDayTables.js";

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


function App() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const placeholderSelectedDate = JSON.parse(localStorage.getItem("selectedDate"));
    if (placeholderSelectedDate) {
      return placeholderSelectedDate;
    } else {
      return new Date().toDateString();
    }
  });


  const [toDoList, setToDoList] = useState(() => {
    const placeholderToDoList = JSON.parse(localStorage.getItem("toDoList"));
    if (placeholderToDoList) {
      return placeholderToDoList;
    }
    else {
      return [];
    }
  });

  const [taskCounter, setTaskCounter] = useState(() => {
    const placeholderTaskCounter = JSON.parse(localStorage.getItem("taskCounter"));
    if (placeholderTaskCounter) {
      return placeholderTaskCounter;
    }
    else {
      return 0;
    }
  });

  const [daysOfWeekArr, setDaysOfWeekArr] = useState(() => {
    const placeholderDaysOfWeekArr = JSON.parse(localStorage.getItem("daysOfWeekArr"));
    if (placeholderDaysOfWeekArr) {
      return placeholderDaysOfWeekArr;
    }
    else {
      return [];
    }
  });



  useEffect(() => localStorage.setItem("toDoList", JSON.stringify(toDoList)), [toDoList, selectedDate, daysOfWeekArr]);

  useEffect(() => localStorage.setItem("selectedDate", JSON.stringify(selectedDate)), [selectedDate]);

  useEffect(() => localStorage.setItem("taskCounter", JSON.stringify(taskCounter)), [taskCounter]);

  useEffect(() => localStorage.setItem("daysOfWeekArr", JSON.stringify(daysOfWeekArr)), [daysOfWeekArr, selectedDate]);

  useEffect(() => {
    let weekDates;
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
      weekDates = [convertedCurrentDate.toDateString()];
      for (let i=0; i < 6; i++) {
          const newDate = new Date (weekDates[i]);
          const nextNewDate = new Date(newDate);
          nextNewDate.setDate(newDate.getDate() + 1);
          weekDates = ([...weekDates, nextNewDate.toDateString()]);
      }
    } else {
      weekDates = [selectedDate];
      for (let i=0; i < 6; i++) {
          const newDate = new Date (weekDates[i]);
          const nextNewDate = new Date(newDate);
          nextNewDate.setDate(newDate.getDate() + 1);
          weekDates = ([...weekDates, nextNewDate.toDateString()]);
      }
    }
      let placeholderToDoList = toDoList.map ((item, index) => {
          const dates = item.dates;
          let datesArr = [];
          let dateObj = {};
          for (let j=0; j<weekDates.length; j++) {
            const day = weekDates[j];
            dateObj = Object.values(item.dates[j])[0];
            datesArr.push({[day]: dateObj});
            console.log({datesArr});
          }
          const newItem = {...item, dates: datesArr} // come back to this
          console.log({newItem}); // come back to this
          return newItem;
        })
      setDaysOfWeekArr(deepFreeze(weekDates));
      setToDoList(deepFreeze([...placeholderToDoList]));
}, [selectedDate]);
  

  function handleSelectedDateChange(event) {
    setSelectedDate(deepFreeze(event.target.value));
  }



  function handleAddNewRowClick () {
    let datesArr = [];
    let dateObj = {};
    console.log({daysOfWeekArr})
    if (daysOfWeekArr.length !== 0) {
      for (let i=0; i < daysOfWeekArr.length; i++) {
        let day = daysOfWeekArr[i];
        dateObj[day] = {
          dayGoalTime: "",
          dayActualTime: "",
          dayNotes: "",
          dayDone: false,
          dayChecked: false
        }
        datesArr.push({[day]: dateObj[day]})
      }
    }
    let newItem = {
      task: "",
      goal: "",
      actual: "",
      dates: datesArr,
      key: taskCounter,
    }
    setToDoList(deepFreeze([...toDoList, newItem]));
    setTaskCounter(deepFreeze(prevCounter => prevCounter + 1));
}


function handleEditTask(event, key) {
  const newTaskName = event.target.value;
  const placeholderToDoList = toDoList.map(item => {
      if (item.key === key) {
        const newItem = {...item, task: newTaskName}
        return newItem;
      } else {
        return item;
      }
    });
  setToDoList(deepFreeze(placeholderToDoList));
  }


function handleDeleteIconClick(itemToDelete) {
  setToDoList(deepFreeze(toDoList.filter(item => item.key !== itemToDelete.key)));
}


function handleInsertIconClick(item, index) {
  const key = item.key;
  const insertIndex = index;
  let datesArr = [];
  let dateObj = {};
  if (daysOfWeekArr.length !== 0) {
    for (let i=0; i < daysOfWeekArr.length; i++) {
      let day = daysOfWeekArr[i];
      dateObj[day] = {
        dayGoalTime: "",
        dayActualTime: "",
        dayNotes: "",
        dayDone: false,
        dayChecked: false
        }
        datesArr.push({[day]: dateObj[day]})
       }
  }
  let newItem = {
    task: "",
    goal: "",
    actual: null,
    dates: datesArr,
    key: taskCounter,
  }
  let placeholderToDoList;
  for (let i=0; i<toDoList.length; i++) {
      console.log({i});
      console.log({insertIndex})
      if (insertIndex === 0) {
        placeholderToDoList = ([newItem, ...toDoList])
      } else if (insertIndex === i) {
          const firstPart = toDoList.slice(0, insertIndex);
          const secondPart = toDoList.slice(insertIndex);
          console.log({firstPart});
          console.log({secondPart});
          placeholderToDoList = ([...firstPart, newItem, ...secondPart]);
      } else {
        continue;
      };
    setToDoList(deepFreeze(placeholderToDoList));
    setTaskCounter(deepFreeze(prevCounter => prevCounter + 1));
  }
}


  return (
    <div className="App">
      <h1>To Do App</h1>
      <Header selectedDate={selectedDate} onSelectedDateChange={handleSelectedDateChange}/>
      <WeekTable toDoList={toDoList} setToDoList={setToDoList} onAddToDoItemClick={handleAddNewRowClick} onEditTaskClick={handleEditTask} onDeleteIconClick={handleDeleteIconClick} onInsertIconClick={handleInsertIconClick}/>
      <CombinedDayTables selectedDate={selectedDate} daysOfWeekArr={daysOfWeekArr} setDaysOfWeekArr={setDaysOfWeekArr} toDoList={toDoList} setToDoList={setToDoList}/>

    </div>
  );
}

export default App;
