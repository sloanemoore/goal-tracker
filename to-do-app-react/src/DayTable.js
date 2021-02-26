import React, {useState} from "react";

export default function DayTable(props) {
    const [errorMessage, setErrorMessage] = useState("");

    // const selectedDate = props.selectedDate;
    const {currentDate, toDoList, setToDoList} = props;
    // console.log(currentDay);
    // const tableDate = selectedDate.toDateString();

    // console.log({selectedDate});
    // console.log({tableDate});
    // console.log("toDoList from DayTable", toDoList);

    function handleGoalEdit (event, key, currentDate) {
        const newGoalTime = Number(event.target.value);
        if (isNaN(newGoalTime)) {
            setErrorMessage("Please enter a valid number");
        } else {
            setErrorMessage("");
            toDoList.map(item => {
                if (item.key === key) {
                    const datesArr = Object.keys(item.dates);
                    // console.log({datesArr});
                    for (let i=0; i<datesArr.length; i++) {
                        if (datesArr[i] === currentDate) {
                            // console.log(datesArr[i]);
                            item["dates"][datesArr[i]]["dayGoalTime"] = newGoalTime;
                        }
                    }
                }
              })
            setToDoList(toDoList);
            // console.log(toDoList);
        }
    }


    function handleActualEdit (event, key, currentDate) {
        const newActualTime = Number(event.target.value);
        if (isNaN(newActualTime)) {
            setErrorMessage("Please enter a valid number");
        } else {
            setErrorMessage("");
            toDoList.map(item => {
                if (item.key === key) {
                    const datesArr = Object.keys(item.dates);
                    // console.log({datesArr});
                    for (let i=0; i<datesArr.length; i++) {
                        if (datesArr[i] === currentDate) {
                            // console.log(datesArr[i]);
                            item["dates"][datesArr[i]]["dayActualTime"] = newActualTime;
                        }
                    }
                }
              })
            setToDoList(toDoList);
        }
        // console.log(toDoList);
    }

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
                    // if (item.task !== "") {
                        // console.log(item);
                        const key = item.key;
                        return <tr key={item.key}>
                            <td className="taskEntry dailyTaskItem">
                                {item.task}
                            </td>
                            <td>
                                <span><input type="text" placeholder="Enter time in min" value={item.goal} onChange={(event) => handleGoalEdit(event, key, currentDate)}/></span>
                            </td>
                            <td>
                                <span><input type="text" placeholder="Enter time in min" value={item.actual} onChange={(event) => handleActualEdit(event, key, currentDate)}/></span>
                            </td>
                            <td>
                                <label className="container"><input type="checkbox" /><span className="checkmark"></span></label>
                            </td>
                        </tr>}
                    // }
                    )}

            </tbody>
        </table>
        <span className="error">{errorMessage}</span>
        </>
    )
}