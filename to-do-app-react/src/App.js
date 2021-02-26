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

  // useEffect(() => console.log("useEffect", {daysOfWeekArr}))
  // useEffect(() => console.log("toDoList from App", {toDoList}), [toDoList]);

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


// need to fix this function so that setToDoList takes toDoList.map
function handleEditTask(event, key) {
  // console.log("user edit!");
  const newTaskName = event.target.value;
  // console.log(newTaskName);
  // // console.log(key);
  const placeholderToDoList = toDoList.map(item => {
      if (item.key === key) {
        item.task = newTaskName;
        return item;
      } else {
        return item;
      }
    });
  setToDoList(placeholderToDoList);
  // setToDoList(toDoList.map(item => {
  //   if (item.key === key) {
  //     item.task = newTaskName;
  //   }
  //   console.log("toDoList from handleEditTask", toDoList);
  // }));
  }


function handleDeleteIconClick(itemToDelete) {
  // console.log("delete icon clicked!");
  // console.log(itemToDelete);
  setToDoList(toDoList.filter(item => item.key !== itemToDelete.key));
  // setToDoList([...toDoList]);
}


function handleInsertIconClick(item, index) {
  const key = item.key;
  const insertIndex = index;
  console.log({toDoList});
  console.log({insertIndex});
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
  let newItem = {
    task: "",
    goal: null,
    actual: null,
    toGo: null,
    dates: dateObj,
    key: taskCounter,
  }
  let placeholderToDoList;
  for (let i=0; i<toDoList.length; i++) {
      // console.log({item});
      // console.log({i});
      // console.log({newItem});
      if (insertIndex === 0) {
        // console.log("debug", [newItem, ...toDoList])
        placeholderToDoList = ([newItem, ...toDoList])
      } else if (insertIndex === i) {
          const firstPart = toDoList.slice(0, insertIndex);
          const secondPart = toDoList.slice(insertIndex);
          // console.log({firstPart});
          // console.log({secondPart});
          placeholderToDoList = ([...firstPart, newItem, ...secondPart]);
    };
    setToDoList(placeholderToDoList);
    setTaskCounter(prevCounter => prevCounter + 1);
  }
}


// this is the function that *almost* works
// function handleAddIconClick(item, index) {
//   const key = item.key;
//   const insertIndex = index;
//   console.log({toDoList});
//   console.log({index});
//   let dateObj = {};
//   // console.log({daysOfWeekArr})
//   if (daysOfWeekArr.length !== 0) {
//     for (let i=0; i < daysOfWeekArr.length; i++) {
//       let day = daysOfWeekArr[i];
//       // console.log(day);
//       dateObj[day] = {
//         dayGoalTime: 0,
//         dayActualTime: 0,
//         dayDone: false,
//         dayChecked: false
//         }
//        }
//   }
//   let newItem = {
//     task: "",
//     goal: null,
//     actual: null,
//     toGo: null,
//     dates: dateObj,
//     key: taskCounter,
//   }
//   const debug = toDoList.map((item, currentIndex) => {
//     console.log({item});
//     console.log({currentIndex});
//     console.log({newItem});
//     if (insertIndex === 0) {
//       console.log("debug", [newItem, ...toDoList])
//       return ([newItem, ...toDoList])
//     } else if (insertIndex === currentIndex) {
//         const firstPart = toDoList.slice(0, insertIndex);
//         const secondPart = toDoList.slice(insertIndex);
//         console.log({firstPart});
//         console.log({secondPart});
//         return ([...firstPart, newItem, ...secondPart]);
//     }
//   });
//   console.log({debug});

  // console.log(taskName);
  // console.log(key);
  // setToDoList(toDoList.map(item => {
  //     if (item.key === key) {
  //       const newTask = {...item, task: taskName};
  //       // newTask.task = taskName;
  //       return newTask;
  //     } else {
  //       return item;
  //     }
  //   }));
// }


// this is the old functionality where you click the addIcon to add a task
// function handleAddIconClick(item) {
//   // console.log("add icon clicked!");
//   const taskName = item.task;
//   const key = item.key;
//   // console.log(taskName);
//   // console.log(key);
//   setToDoList(toDoList.map(item => {
//       if (item.key === key) {
//         const newTask = {...item, task: taskName};
//         // newTask.task = taskName;
//         return newTask;
//       } else {
//         return item;
//       }
//     }));
// }

// console.log({toDoList}); // may want to add this back in
// console.log({daysOfWeekArr}); // may want to add this back in
// console.log({toDoList}); // may want to add this back in

  return (
    <div className="App">
      <h1>To Do App</h1>
      <Header selectedDate={selectedDate} onSelectedDateChange={handleSelectedDateChange}/>
      <WeekTable toDoList={toDoList} onAddToDoItemClick={handleAddNewRowClick} onEditTaskClick={handleEditTask} onDeleteIconClick={handleDeleteIconClick} onInsertIconClick={handleInsertIconClick}/>
      <CombinedDayTables selectedDate={selectedDate} daysOfWeekArr={daysOfWeekArr} setDaysOfWeekArr={setDaysOfWeekArr} toDoList={toDoList} setToDoList={setToDoList}/>
      {/* <DayTable selectedDate={selectedDate}/> */}

    </div>
  );
}

export default App;
