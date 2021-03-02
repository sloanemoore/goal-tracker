import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle, faTasks } from '@fortawesome/free-solid-svg-icons'

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

export default function WeekTable(props) {
    const {toDoList, setToDoList, onAddToDoItemClick, onEditTaskClick, onDeleteIconClick, onInsertIconClick} = props;


    const insertIcon = <FontAwesomeIcon icon={faPlusCircle} />
    const deleteIcon = <FontAwesomeIcon icon={faMinusCircle} />

    // console.log("toDoList from WeekTable", toDoList);

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
        console.log({placeholderToDoList})
        // setToDoList(placeholderToDoList);
    }

    // totalGoalTime();

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th className="noTableBorder"></th>
                    <th className="rowHighlight" colSpan="4">
                        Weekly Total
                    </th>
                    <th className="noTableBorder"></th>
                </tr>
                <tr>
                    <td className="noTableBorder">
                    </td>
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
                        To Go (in min.)
                    </td>
                    <td className="noTableBorder">
                    </td>
                </tr>
            </thead>
            <tbody>
                {toDoList.map((item, index) => {
                    const key = item.key;
                    return <tr key={key}>
                        <td className="noTableBorder">
                            <span className="addIcon" onClick={() => onInsertIconClick(item, index)}>{insertIcon}</span>
                        </td>
                        <td className="taskEntry">
                            <span><input type="text" placeholder="Add a task" defaultValue={item.task} key={key} onChange={(event) => onEditTaskClick(event, key)}/></span>
                        </td>
                        {/* <td className="taskEntry">
                            <span><input type="text" placeholder="Add a task" defaultValue={item.task} key={key} onChange={(event) => onEditTaskClick(event, key)}/></span>
                        </td> */}
                        <td className="weekCalculatedItem">
                            {item.goal}
                        </td>
                        <td className="weekCalculatedItem">
                            {item.actual}
                        </td>
                        <td className="weekCalculatedItem">
                            {item.goal !== "" && item.actual !== "" && item.goal - item.actual}
                        </td>
                        <td className="noTableBorder">
                            <span className="deleteIcon" onClick={() => onDeleteIconClick(item)}>{deleteIcon}</span>
                        </td>
                    </tr>
                })
                }
                <tr>
                    <td className="noTableBorder">
                    </td>
                    <td className="taskEntry">
                        <span onClick={onAddToDoItemClick}><input type="text" placeholder="Add a new row" disabled/></span>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                    <td className="noTableBorder">
                    </td>
                </tr>
            </tbody>
        </table>
        </>
    )
}