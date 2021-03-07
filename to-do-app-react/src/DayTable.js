import React, {useState, useEffect} from "react";

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



export default function DayTable(props) {
    const [errorMessage, setErrorMessage] = useState("");

    const {currentDate, toDoList, setToDoList, index} = props;

    console.log("currentDate from DayTable: ", currentDate);


    function handleGoalEdit (event, key, currentDate) {
        let placeholderToDoList;
        const newGoalTime = Number(event.target.value);
        if (isNaN(newGoalTime)) {
            return setErrorMessage(deepFreeze("Please enter a valid number"));
        } else {
            setErrorMessage(deepFreeze(""));
            placeholderToDoList = toDoList.map(item => {
                if (item.key === key) {
                    for (let i=0; i<item.dates.length; i++) {
                        const day = Object.keys(item.dates[i])[0];
                        if (day === currentDate) {
                            const dateItem = {...item.dates[i][day]};
                            const newDayDone = dateItem.dayActualTime > dateItem.newGoalTime; // this is the line I changed most recently
                            const updatedDateItem = {...dateItem, dayGoalTime: newGoalTime, dayDone: newDayDone}; // I changed this line, too
                            console.log({updatedDateItem});
                            const newDates = [...item.dates];
                            newDates[i] = {[day]: updatedDateItem};
                            const newItem = {...item, dates: newDates};
                            return newItem;
                        } 
                    }
                } else {
                    return item;
                }
              })
            }
            setToDoList(deepFreeze(placeholderToDoList.map(item => {
            if (item.key === key) {
                let tempGoalTotal = 0; 
                for (let i=0; i< item.dates.length; i++) {
                    const day = Object.keys(item.dates[i])[0]; 
                    const dayGT = Number(item.dates[i][day].dayGoalTime);
                    tempGoalTotal += Number(item.dates[i][day].dayGoalTime);
                }
                const updatedItem = {...item, goal: tempGoalTotal};
                return updatedItem;
            } else {
                return item;
            }
        })
    ));
}

console.log("toDoList from DayTable: ", {toDoList});


    function handleActualEdit (event, key, currentDate) {
        let placeholderToDoList;
        const newActualTime = Number(event.target.value);
        if (isNaN(newActualTime)) {
            return setErrorMessage(deepFreeze("Please enter a valid number"));
        } else {
            setErrorMessage(deepFreeze(""));
            placeholderToDoList = toDoList.map(item => {
                if (item.key === key) {
                    for (let i=0; i<item.dates.length; i++) {
                        const day = Object.keys(item.dates[i])[0];
                        if (day === currentDate) {
                            const dateItem = {...item.dates[i][day]};
                            const newDayDone = newActualTime >= dateItem.dayGoalTime; // this is the line I changed most recently
                            const updatedDateItem = {...dateItem, dayActualTime: newActualTime, dayDone: newDayDone}; // I changed this line, too
                            const newDates = [...item.dates];
                            newDates[i] = {[day]: updatedDateItem};
                            const newItem = {...item, dates: newDates};
                            return newItem;
                        } 
                    }
                } else {
                    return item;
                }
            })
            }
            setToDoList(deepFreeze(placeholderToDoList.map(item => {
            if (item.key === key) {
                let tempActualTotal = 0; 
                for (let i=0; i< item.dates.length; i++) {
                    const day = Object.keys(item.dates[i])[0]; 
                    const dayAT = Number(item.dates[i][day].dayActualTime);
                    tempActualTotal += Number(item.dates[i][day].dayActualTime);
                }
                const updatedItem = {...item, actual: tempActualTotal};
                return updatedItem;
            } else {
                return item;
            }
        })
    ));
    }

    function handleCheckboxClick(event, key, currentDate) {
        const dayTaskChecked = event.target.checked;
        let placeholderToDoList = toDoList.map(item => {
            if (item.key === key) {
                for (let i=0; i<item.dates.length; i++) {
                    const day = Object.keys(item.dates[i])[0];
                    if (day === currentDate) {
                        const updatedDayObj = {...item.dates[i][day], dayChecked: dayTaskChecked};
                        const updatedDates = [...item.dates];
                        updatedDates[i] = {[day]: updatedDayObj};
                        const updatedItem = {...item, dates: updatedDates}
                        return updatedItem
                    }
                }
            } else {
                return item;
            }
        })
        setToDoList(deepFreeze(placeholderToDoList));
    }

    
    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th className="rowHighlight" colSpan="4">
                        {currentDate}
                    </th>
                </tr>
                <tr>
                    <td className="taskEntry">
                        Task
                    </td>
                    <td>
                        Goal (in min.)
                    </td>
                    <td>
                        Actual (in min.)
                    </td>
                    <td>
                        Done
                    </td>
                </tr>
            </thead>
            <tbody>
                {toDoList.map(item => {
                        const key = item.key;
                        // const day = Object.keys(item.dates[index])[0];
                        return <tr key={item.key}>
                            <td className="taskEntry dailyTaskItem">
                                {item.task}
                            </td>
                            <td>
                                <span><input type="text" placeholder="Enter time in min" value={item.dates[index][currentDate].dayGoalTime} onChange={(event) => handleGoalEdit(event, key, currentDate)}/></span>
                            </td>
                            <td>
                                <span><input type="text" placeholder="Enter time in min" value={item.dates[index][currentDate].dayActualTime} onChange={(event) => handleActualEdit(event, key, currentDate)}/></span>
                            </td>
                            <td>
                                {/* {item.dates[index][currentDate].dayDone && <label className="container"><input type="checkbox" checked={item.dates[index][currentDate].dayChecked} onClick={(event) => handleCheckboxClick(event, key, currentDate)}/><span className="checkmark"></span></label>} */}
                                {item.dates[index][currentDate].dayActualTime!=="" && item.dates[index][currentDate].dayGoalTime!== 0 && item.dates[index][currentDate].dayActualTime >= item.dates[index][currentDate].dayGoalTime && <label className="container"><input type="checkbox" checked={item.dates[index][currentDate].dayChecked} onChange={(event) => handleCheckboxClick(event, key, currentDate)}/><span className="checkmark"></span></label>}
                            </td>
                        </tr>}
                    )}

            </tbody>
        </table>
        <span className="error">{errorMessage}</span>
        </div>
    )
}