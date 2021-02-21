import React, {useState} from "react";
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

  function handleSelectedDateChange(event) {
    // console.log(event.target.value);
    // console.log(typeof(event.target.value));
    setSelectedDate(event.target.value);
  }

  function handleAddNewRowClick () {
    console.log("add new row clicked!")
    // console.log({toDoList});
    // console.log(typeof(toDoList));
    let newItem = {
      task: "",
      goal: 0,
      actual: 0,
      toGo: 0,
      dates: [],
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
  console.log("delete icon clicked!");
  // console.log(itemToDelete);
  setToDoList(toDoList.filter(item => item.key !== itemToDelete.key));
  // setToDoList([...toDoList]);
}

// You need to fix this function!!!
function handleAddIconClick(item) {
  console.log("add icon clicked!");
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

console.log({toDoList});
// console.log(taskCounter);

  return (
    <div className="App">
      <h1>To Do App</h1>
      <Header selectedDate={selectedDate} onSelectedDateChange={handleSelectedDateChange}/>
      <WeekTable toDoList={toDoList} onAddToDoItemClick={handleAddNewRowClick} onEditTaskClick={handleEditTask} onDeleteIconClick={handleDeleteIconClick} onAddIconClick={handleAddIconClick}/>
      <CombinedDayTables selectedDate={selectedDate} daysOfWeekArr={daysOfWeekArr} setDaysOfWeekArr={setDaysOfWeekArr} toDoList={toDoList}/>
      {/* <DayTable selectedDate={selectedDate}/> */}

    </div>
  );
}

export default App;
