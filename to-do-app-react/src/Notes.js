import React, {useState, useEffect} from "react";


export default function Notes(props) {
    const {toDoList, setToDoList, index, currentDate} = props;


    console.log({props});
    console.log({toDoList});
    console.log({currentDate});

    function handleNotesEdit (event, key) {
        let placeholderToDoList;
        const newNotes = event.target.value;
        placeholderToDoList = toDoList.map(item => {
            if (item.key === key) {
                for (let i=0; i<item.dates.length; i++) {
                    const day = Object.keys(item.dates[i])[0];
                    console.log("day: ", day);
                    console.log({currentDate});
                    console.log(currentDate === day);
                    if (day === currentDate) {
                        const dateItem = {...item.dates[i][day]};
                        const updatedDateItem = {...dateItem, dayNotes: newNotes}; // I changed this line, too
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
            setToDoList(placeholderToDoList);
    }

    return (
        <>
        <table className="tableBlock">
            <thead>
                <tr>
                <th className="rowHighlight">
                        Notes
                    </th>
                </tr>
                <tr>
                    <td className="taskEntry">
                        Task Details
                    </td>
			</tr>
            </thead>
                <tbody>
                    {toDoList.map(item => {
                        const key = item.key;
                        const day = Object.keys(item.dates[index])[0];
                        return <tr key={key}>
                            <td className="notesEntry">
                                <span><input type="text" placeholder="Add a note" value={item.dates[index][currentDate].dayNotes} key={key} onChange={(event) => handleNotesEdit(event, key)}/></span>
                            </td>
                        </tr>
                    })
                    }
                </tbody>
        </table>
        </>
    )
}