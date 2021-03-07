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
  const [selectedDate, setSelectedDate] = useState(() => {
    const placeholderSelectedDate = JSON.parse(localStorage.getItem("selectedDate"));
    if (placeholderSelectedDate) {
      return placeholderSelectedDate;
    } else {
      return new Date().toDateString();
    }
  });

  // const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  // console.log(selectedDate);

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


  // useEffect(() => console.log({toDoList}), [selectedDate]); // may want to add this back in


  useEffect(() => localStorage.setItem("toDoList", JSON.stringify(toDoList)), [toDoList, selectedDate, daysOfWeekArr]);

  useEffect(() => localStorage.setItem("selectedDate", JSON.stringify(selectedDate)), [selectedDate]);

  useEffect(() => localStorage.setItem("taskCounter", JSON.stringify(taskCounter)), [taskCounter]);

  useEffect(() => localStorage.setItem("daysOfWeekArr", JSON.stringify(daysOfWeekArr)), [daysOfWeekArr, selectedDate]);

  useEffect(() => {
    // console.log({selectedDate});
    // start commented section
    // let enteredData;
    //  if there is data entered in the daily section of the toDoList, then skip the below if statement-- this goes to the else statement
    // for (let i=0; i<toDoList.length; i++) {
    //   const item = toDoList[i];
    //   const dates = item.dates;
    //   if (item.dates) {
    //     for (let j=0; j<dates.length; j++) {
    //       const day = Object.keys(dates[j])[0];
    //       const dayGoalTime = item.dates[j][day].dayGoalTime;
    //       const dayActualTime = item.dates[j][day].dayActualTime;
    //       const dayNotes = item.dates[j][day].dayNotes;
    //       if (dayGoalTime || dayActualTime || dayNotes) {
    //       enteredData = true;
    //       }
    //     }
    //   }
    // }
    // console.log({enteredData});


    // if (toDoList.length === 0 || toDoList[0] || !toDoList[0].dates.length) { // you may need to add this line back in


    // if (!isNaN(selectedDate)) {
        // const convertedCurrentDate = new Date(...dateParts);
    // end commented section
    console.log({selectedDate});
    let weekDates;
    const dateParts = selectedDate.split("-").map((item, i) => {
      if (i === 1) {
        return Number(item) -1;
      } else {
        return Number(item)
      }
    });
  const convertedCurrentDate = new Date(...dateParts);
  console.log({convertedCurrentDate});
  if (!isNaN(convertedCurrentDate)) {
      const convertedCurrentDate = new Date(...dateParts);
      // console.log(convertedCurrentDate.toDateString());
      weekDates = [convertedCurrentDate.toDateString()];
      // let placeholderToDoList = [...toDoList];
      for (let i=0; i < 6; i++) {
          const newDate = new Date (weekDates[i]);
          const nextNewDate = new Date(newDate);
          nextNewDate.setDate(newDate.getDate() + 1);
          weekDates = ([...weekDates, nextNewDate.toDateString()]);
      }
    } else {
      weekDates = [selectedDate];
      // let placeholderToDoList = [...toDoList];
      for (let i=0; i < 6; i++) {
          const newDate = new Date (weekDates[i]);
          const nextNewDate = new Date(newDate);
          nextNewDate.setDate(newDate.getDate() + 1);
          weekDates = ([...weekDates, nextNewDate.toDateString()]);
      }

    }
    console.log({weekDates});

    // start new datesArr
  //   if (!enteredData) {

  //   let datesArr = [];
  //   let dateObj = {};
  //   for (let i=0; i<weekDates.length; i++) {
  //     let day = weekDates[i];
  //     // console.log("weekday Dates", weekDates[i]);
  //     // console.log({day});
  //     dateObj[day] = {
  //       dayGoalTime: "",
  //       dayActualTime: "",
  //       dayNotes: "",
  //       dayDone: false,
  //       dayChecked: false
  //     }
  //     datesArr.push({[day]: dateObj[day]})
  //   }

  //   // end new datesArr


  //     // console.log({datesArr});
  //     console.log({datesArr});
  //     let placeholderToDoList = toDoList.map (item => {
  //       console.log({item});
  //       const newItem = {...item, dates: datesArr} // come back to this
  //       console.log({newItem}); // come back to this
  //       return newItem;
  //     })
  //     setDaysOfWeekArr(deepFreeze(weekDates));
  //     setToDoList(deepFreeze([...placeholderToDoList]));

  // } // you need to add this back in if you uncomment if (!toDoList.length === 0 || !toDoList[0] || !toDoList[0].dates.length)
  // else { // if (enteredData)

  // you just commented out this section -- 210306
    // let datesArr = [];
    // let dateObj = {};
    // for (let i=0; i< toDoList.length; i++) {
    //   const item = toDoList[i];
    //   const dates = item.dates;
    //   for (let j=0; j<weekDates.length; j++) {
    //     const day = weekDates[j];
    //     dateObj = Object.values(item.dates[j]);
    //     datesArr.push({[day]: dateObj[day]});
    //     console.log({datesArr});
    //   }
    // }
      // end of you just commented out this section -- 210306

    // end new datesArr


      // console.log({datesArr});
      // console.log({datesArr});
      let placeholderToDoList = toDoList.map ((item, index) => {

        // for (let i=0; i< toDoList.length; i++) {
          // const item = toDoList[i];
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
        // }
      })
        // const newItem = {...item, dates: datesArr} // come back to this
        // console.log({newItem}); // come back to this
        // return newItem;
      // })
        // console.log({item});
        // let datesArr = [];
        // let dateObj = {};
        // for (let i=0; i<weekDates.length; i++) {
        //   const newDay = weekDates[i];
        //   const oldDay = Object.keys(item.dates[i])[0];
        //   dateObj = {[newDay]: Object.values(item.dates[i])};
          // dateObj[newDay] = {
          //   dayGoalTime: item.dates[i][oldDay].dayGoalTime, // this is where things go wrong; also see DayTable, 172
          //   dayActualTime: item.dates[i][oldDay].dayActualTime,
          //   dayNotes: item.dates[i][oldDay].dayNotes,
          //   dayDone: item.dates[i][oldDay].dayDone,
          //   dayChecked: item.dates[i][oldDay].dayChecked,
          // }
      //   const newItem = {...item, dates: datesArr} // come back to this
      //   console.log({newItem}); // come back to this
      //   return newItem;
      // })
      setDaysOfWeekArr(deepFreeze(weekDates));
      setToDoList(deepFreeze([...placeholderToDoList]));
  // }
}, [selectedDate]);
  
// console.log({weekDates});

  // useEffect(() => console.log("toDoList from App", {toDoList}));

  // console.log({toDoList})

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
    console.log({daysOfWeekArr})
    if (daysOfWeekArr.length !== 0) {
      for (let i=0; i < daysOfWeekArr.length; i++) {
        let day = daysOfWeekArr[i];
        // console.log("weekday Dates", weekDates[i]);
        // console.log({day});
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
    // console.log(dateObj);
    let newItem = {
      task: "",
      goal: "",
      actual: "",
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
      // console.log({item});
      // console.log({i});
      // console.log({newItem});
      console.log({i});
      console.log({insertIndex})
      if (insertIndex === 0) {
        // console.log("debug", [newItem, ...toDoList])
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
