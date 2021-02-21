import React from "react";

export default function DayTable(props) {

    // const selectedDate = props.selectedDate;
    const {currentDate, toDoList} = props;
    // console.log(currentDay);
    // const tableDate = selectedDate.toDateString();

    // console.log(selectedDate);
    // console.log(tableDate);
    // console.log(toDoList);


    return (
        <>
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
                    if (item.task !== "")
                        {return <tr key={item.key}>
                            <td className="taskEntry dailyTaskItem">
                                {item.task}
                            </td>
                            <td>
                                <span><input type="text" placeholder="Enter time in min"/></span>
                            </td>
                            <td>
                                <span><input type="text" placeholder="Enter time in min"/></span>
                            </td>
                            <td>
                                <label className="container"><input type="checkbox" /><span className="checkmark"></span></label>
                            </td>
                        </tr>}
                    })}

            </tbody>
        </table>
        </>
    )
}