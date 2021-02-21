import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle, faTasks } from '@fortawesome/free-solid-svg-icons'

export default function DayTable(props) {
    const {toDoList, onAddToDoItemClick, onEditTaskClick, onDeleteIconClick, onAddIconClick} = props;


    const addIcon = <FontAwesomeIcon icon={faPlusCircle} />
    const deleteIcon = <FontAwesomeIcon icon={faMinusCircle} />

    console.log(toDoList);

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
                    return <tr key={index}>
                        <td className="noTableBorder">
                            <span className="addIcon" onClick={() => onAddIconClick(item)}>{addIcon}</span>
                        </td>
                        <td className="taskEntry">
                            <span><input type="text" placeholder="Add a task" defaultValue={item.task} key={key} onChange={(event) => onEditTaskClick(event, key)}/></span>
                        </td>
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