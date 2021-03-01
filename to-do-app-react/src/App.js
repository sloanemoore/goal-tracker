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

// Object.assign(deepFreeze({}), {a: 1});
// console.log(Object.assign(deepFreeze({}), {a: 1}));

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
        // let placeholderToDoList = [...toDoList];
        for (let i=0; i < 6; i++) {
            const newDate = new Date (weekDates[i]);
            const nextNewDate = new Date(newDate);
            nextNewDate.setDate(newDate.getDate() + 1);
            weekDates = ([...weekDates, nextNewDate.toDateString()]);
        }
    // console.log({weekDates});
    // this is where new dateObj added to task
    // console.log("selected Date Change", {weekDates});
    

    // start new datesArr

      // console.log("item dates", item.dates);
    let datesArr = [];
    let dateObj = {};
    for (let i=0; i<weekDates.length; i++) {
      let day = weekDates[i];
      // console.log("weekday Dates", weekDates[i]);
      // console.log({day});
      dateObj[day] = {
        dayGoalTime: 0,
        dayActualTime: 0,
        dayDone: false,
        dayChecked: false
      }
      datesArr.push({[day]: dateObj[day]})
    }

    // end new datesArr


      // console.log({datesArr});
      console.log({datesArr});
      let placeholderToDoList = toDoList.map (item => {
        console.log({item});
        const newItem = {...item, dates: datesArr} // come back to this
        console.log({newItem}); // come back to this
        return newItem;
      })
      setDaysOfWeekArr(deepFreeze(weekDates));
      setToDoList(deepFreeze([...placeholderToDoList]));
    }
}, [selectedDate]);
  

  // start this is the original function (combined datesArr and setting setDaysOfWeekArr and setToDoList)

//   toDoList.map(item => {
//     // console.log("item dates", item.dates);
//     let datesArr = [];
//     let dateObj = {};
//     for (let i=0; i<weekDates.length; i++) {
//       let day = weekDates[i];
//       // console.log("weekday Dates", weekDates[i]);
//       // console.log({day});
//       dateObj[day] = {
//         dayGoalTime: 0,
//         dayActualTime: 0,
//         dayDone: false,
//         dayChecked: false
//       }
//       datesArr.push({[day]: dateObj[day]})
//     }
//     // console.log({datesArr});
//     console.log({datesArr});
//     for (let i=0; i<placeholderToDoList.length; i++) {
//       const item = placeholderToDoList[i];
//       console.log({item});
//       const newItem = {...item, dates: datesArr}// come back to this
//       // placeholderToDoList[i]["dates"] = datesArr;
//       // console.log({placeholderToDoList});
//       console.log({newItem}); // come back to this
//     }
//   })
//   setDaysOfWeekArr(weekDates);
//   setToDoList([...placeholderToDoList]);
//   }
// }, [selectedDate]);  


  // end this is the original function


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
  useEffect(() => console.log("toDoList from App", {toDoList}));

  console.log({toDoList})

  function handleSelectedDateChange(event) {
    // console.log(event.target.value);
    // console.log(typeof(event.target.value));
    setSelectedDate(deepFreeze(event.target.value));
  }



  function handleAddNewRowClick () {
    // console.log("add new row clicked!");
    // console.log({toDoList});
    // console.log(typeof(toDoList));
    let datesArr = [];
    let dateObj = {};
    // console.log({daysOfWeekArr})
    if (daysOfWeekArr.length !== 0) {
      for (let i=0; i < daysOfWeekArr.length; i++) {
        let day = daysOfWeekArr[i];
        // console.log("weekday Dates", weekDates[i]);
        // console.log({day});
        dateObj[day] = {
          dayGoalTime: 0,
          dayActualTime: 0,
          dayDone: false,
          dayChecked: false
        }
        datesArr.push({[day]: dateObj[day]})
      }
        // let day = daysOfWeekArr[i];
        // // console.log(day);
        // dateObj[day] = {
        //   dayGoalTime: 0,
        //   dayActualTime: 0,
        //   dayDone: false,
        //   dayChecked: false
        //   }
        //  }
    }
    // console.log(dateObj);
    let newItem = {
      task: "",
      goal: "",
      actual: null,
      toGo: null,
      dates: datesArr,
      key: taskCounter,
    }
    // toDoList.push(newItem);  
    setToDoList(deepFreeze([...toDoList, newItem]));
    setTaskCounter(deepFreeze(prevCounter => prevCounter + 1));
}


function handleEditTask(event, key) {
  // console.log("user edit!");
  const newTaskName = event.target.value;
  // console.log(newTaskName);
  // // console.log(key);
  const placeholderToDoList = toDoList.map(item => {
      if (item.key === key) {
        const newItem = {...item, task: newTaskName}
        return newItem;
      } else {
        return item;
      }
    });
  setToDoList(deepFreeze(placeholderToDoList));
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
  setToDoList(deepFreeze(toDoList.filter(item => item.key !== itemToDelete.key)));
  // setToDoList([...toDoList]);
}


function handleInsertIconClick(item, index) {
  const key = item.key;
  const insertIndex = index;
  // console.log({toDoList});
  // console.log({insertIndex});
  let datesArr = [];
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
        datesArr.push({[day]: dateObj[day]})
       }
  }
  let newItem = {
    task: "",
    goal: "",
    actual: null,
    toGo: null,
    dates: datesArr,
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
    setToDoList(deepFreeze(placeholderToDoList));
    setTaskCounter(deepFreeze(prevCounter => prevCounter + 1));
  }
}

    //this function produces the right output, but doesn't set the state
    function totalGoalTime() {
      let placeholderToDoList = [];
      // console.log(placeholderToDoList);
      for (let i=0; i< toDoList.length; i++) {
          const item = toDoList[i];
          console.log({item});
          console.log("item dates: ", item.dates);
          let tempGoalTotal = 0;
          // console.log({day});
          // console.log(item.dates.dayGoalTime);
          for (let i=0; i< item.dates.length; i++) {
              const day = Object.keys(item.dates[i])[0]; 
              tempGoalTotal += Number(item.dates[i][day].dayGoalTime);
              // console.log(day);
              // console.log("dayGoalTime: ", item.dates[i][day].dayGoalTime);
              // let taskTotalGoaltime = item.dates.reduce((acc, date) => acc += Number(item.dates[i][day].dayGoalTime), 0);
          }
          console.log(tempGoalTotal);
          const updatedItem = {...item, goal: tempGoalTotal};
          console.log({updatedItem});
          placeholderToDoList.push(updatedItem);
  //         // taskTotalGoalTime.push(item.dates.reduce((acc, item) => acc += item.date.dayGoalTime));
      } 
      console.log(placeholderToDoList)
      setToDoList(deepFreeze(placeholderToDoList));
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
      <WeekTable toDoList={toDoList} setToDoList={setToDoList} onAddToDoItemClick={handleAddNewRowClick} onEditTaskClick={handleEditTask} onDeleteIconClick={handleDeleteIconClick} onInsertIconClick={handleInsertIconClick}/>
      <CombinedDayTables selectedDate={selectedDate} daysOfWeekArr={daysOfWeekArr} setDaysOfWeekArr={setDaysOfWeekArr} toDoList={toDoList} setToDoList={setToDoList}/>
      {/* <DayTable selectedDate={selectedDate}/> */}

    </div>
  );
}

export default App;
