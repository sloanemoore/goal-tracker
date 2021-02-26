import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle, faTasks } from '@fortawesome/free-solid-svg-icons'

export default function WeekTable(props) {
    const {toDoList, onAddToDoItemClick, onEditTaskClick, onDeleteIconClick, onInsertIconClick} = props;


    const insertIcon = <FontAwesomeIcon icon={faPlusCircle} />
    const deleteIcon = <FontAwesomeIcon icon={faMinusCircle} />

    // console.log("toDoList from WeekTable", toDoList);
    let taskTotalGoalTime = [];

    // function totalGoalTime() {
    //     let placeholderToDoList = [...toDoList];
    //     console.log(placeholderToDoList);
    //     for (let item of placeholderToDoList) {
    //         console.log({item});
    //         console.log(item.dates);
    //         for (let date in item.dates) {
    //             console.log(item.dates[0].dayGoalTime);
    //         }
    //         // taskTotalGoalTime.push(item.dates.reduce((acc, item) => acc += item.date.dayGoalTime));
    //     }
    // }

    // totalGoalTime();

    // console.log({taskTotalGoalTime});


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
                            {item.toGo}
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