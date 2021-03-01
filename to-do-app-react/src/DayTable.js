import React, {useState} from "react";

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

    // const selectedDate = props.selectedDate;
    const {currentDate, toDoList, setToDoList} = props;
    // console.log(currentDay);
    // const tableDate = selectedDate.toDateString();

    // console.log({selectedDate});
    // console.log({tableDate});
    // console.log("toDoList from DayTable", toDoList);

    // function updateGoalEdit(event, key, currentDate) {
    //     handleGoalEdit(event, key, currentDate);
    //     totalGoalTime();
    // }


    function handleGoalEdit (event, key, currentDate) {

        // start new update
        let placeholderToDoList;
        const newGoalTime = Number(event.target.value);
        // console.log({newGoalTime});
        if (isNaN(newGoalTime)) {
            setErrorMessage(deepFreeze("Please enter a valid number"));
        } else {
            setErrorMessage(deepFreeze(""));
            // let placeholderToDoList = [...toDoList];
            placeholderToDoList = toDoList.map(item => {
                // console.log({key});
                // console.log("item key: ", item.key);
                if (item.key === key) {
                    // const datesArr = Object.keys(item.dates); // may need to change this back
                    // console.log("item dates: ", item.dates);
                    for (let i=0; i<item.dates.length; i++) {
                        // console.log(currentDate);
                        const day = Object.keys(item.dates[i])[0];
                        // console.log({day});
                        // console.log(item.dates[i][day]);
                        // console.log(item.dates[i][day]["dayGoalTime"]);
                        // console.log(Object.keys(item.dates[i]));
                        // console.log({currentDate});
                        if (day === currentDate) {
                            const dateItem = {...item.dates[i][day]};
                            // console.log({dateItem});
                            const updatedDateItem = {...dateItem, dayGoalTime: newGoalTime};
                            console.log({updatedDateItem});
                            const newDates = [...item.dates];
                            // console.log({newDates});
                            const index = i;
                            newDates[i] = {[day]: updatedDateItem};
                            const newItem = {...item, dates: newDates};
                            // console.log({newItem});
                            return newItem;
                            // item.dates[i][day]["dayGoalTime"] = newGoalTime; // fix this to a spread expression as below
                        } 
                    }
                } else {
                    return item;
                }
              })
            }
            // console.log({placeholderToDoList});
                        // new update to weekTable // this starts the part that breaks


            // let debug = placeholderToDoList.map(item => {
            //     console.log({item});
            //     if (item.key === key) {
            //         let tempGoalTotal = 30; 
            //         // for (let i=0; i< item.dates.length; i++) {
            //         //     const day = Object.keys(item.dates[i])[0]; 
            //         //     tempGoalTotal += Number(item.dates[i][day].dayGoalTime);
            //         // }
            //         console.log({tempGoalTotal});
            //         console.log("item goal: ", item.goal);
            //         console.log("given key :", key);
            //         console.log("item key :", item.key);
            //         const updatedItem = {...item, goal: tempGoalTotal};
            //         console.log("updatedItem: ", updatedItem);
            //         return updatedItem;
            //     } else {
            //         console.log("item :", item);
            //         return item;
            //     }
            // })
            // console.log({debug});
         // end new update / this ends the part that breaks
            // console.log({placeholderToDoList});


                // new update to weekTable // this starts the part that breaks
            setToDoList(deepFreeze(placeholderToDoList.map(item => {
            // console.log({toDoList});
            // console.log({item});
            if (item.key === key) {
                let tempGoalTotal = 0; 
                for (let i=0; i< item.dates.length; i++) {
                    const day = Object.keys(item.dates[i])[0]; 
                    // console.log({day});
                    const dayGT = Number(item.dates[i][day].dayGoalTime);
                    // console.log({dayGT});
                    tempGoalTotal += Number(item.dates[i][day].dayGoalTime);
                }
                // console.log({tempGoalTotal});
                // console.log("item goal: ", item.goal);
                // console.log("given key :", key);
                // console.log("item key :", item.key);
                const updatedItem = {...item, goal: tempGoalTotal};
                // console.log("updatedItem: ", updatedItem);
                return updatedItem;
            } else {
                // console.log("item :", item);
                return item;
            }
        })
            ));
    // end new update / this ends the part that breaks
}



                    // end new update
        // const newGoalTime = Number(event.target.value);
        // if (isNaN(newGoalTime)) {
        //     setErrorMessage("Please enter a valid number");
        // } else {
        //     setErrorMessage("");
        //     let placeholderToDoList = toDoList.map(item => {
        //         if (item.key === key) {
        //             // const datesArr = Object.keys(item.dates); // may need to change this back
        //             // console.log(item.dates);
        //             for (let i=0; i<item.dates.length; i++) {
        //                 // console.log(currentDate);
        //                 const day = Object.keys(item.dates[i])[0];
        //                 // console.log(day);
        //                 // console.log(item.dates[i][day]);
        //                 // console.log(item.dates[i][day]["dayGoalTime"]);
        //                 // console.log(Object.keys(item.dates[i]));
        //                 if (Object.keys(item.dates[i])[0] === currentDate) {
        //                     const dateItem = {...item.dates[i][day]};
        //                     const updatedDateItem = {...dateItem, dayGoalTime: newGoalTime};
        //                     console.log({updatedDateItem});
        //                     const newDates = [...item.dates];
        //                     const index = i;
        //                     newDates[i] = {[day]: updatedDateItem};
        //                     const newItem = {...item, dates: newDates};
        //                     console.log({newItem});
        //                     return newItem;
        //                     // item.dates[i][day]["dayGoalTime"] = newGoalTime; // fix this to a spread expression as below
        //                 }
        //             }
                    // new update to weekTable


                    // end new update

                    // start new update
                        // CONSIDER CALLING A HELPER FUNCTION HERE THAT FINDS THE TOTAL GOAL TIME


                    //end new update
                    // return item;


            //   console.log({placeholderToDoList});
            // new update to weekTable
        //     setToDoList(placeholderToDoList.map((item, index) => {
        //         console.log({placeholderToDoList});
        //         console.log({item});
        //         if (item.key === key) {
        //             let tempGoalTotal = 0; 
        //             for (let i=0; i< item.dates.length; i++) {
        //                 const day = Object.keys(item.dates[i])[0]; 
        //                 tempGoalTotal += Number(item.dates[i][day].dayGoalTime);
        //             }
        //             console.log({tempGoalTotal});
        //             console.log("item goal: ", item.goal);
        //             console.log("given key :", key);
        //             console.log("item key :", item.key);
        //             const updatedItem = {...item, goal: tempGoalTotal};
        //             console.log("updatedItem: ", updatedItem);
        //             return updatedItem;
        //         } else {
        //             console.log("item :", item);
        //             return item;
        //         }
        //     })
        // )
         // end new update


            // start old update
            // let updatedToDoList;
            // for (let i=0; i< placeholderToDoList.length; i++) {
            //     let item = placeholderToDoList[i];
            //     if (item.key === key) {
            //         let tempGoalTotal = 0; 
            //         for (let i=0; i< item.dates.length; i++) {
            //             const day = Object.keys(item.dates[i])[0]; 
            //             tempGoalTotal += Number(item.dates[i][day].dayGoalTime);
            //         }
            //         console.log({tempGoalTotal});
            //         console.log("item goal: ", item.goal);
            //         console.log("given key :", key);
            //         console.log("item key :", item.key);
            //         console.log("item :", item);
            //         const updatedItem = {...item, goal: tempGoalTotal};
            //         console.log("updatedItem: ", updatedItem);
            //         updatedToDoList = placeholderToDoList.map(item => {
            //             if (item.key === key) {
            //                 item = updatedItem;
            //                 return item;
            //             } else {
            //                 return item;
            //             }
            //         });
            //         console.log(updatedToDoList)
                    // end old update


                    // console.log("remainingItemsToDoList ", remainingItemsToDoList);
                    // newPlaceholderToDoList = ([...remainingItemsToDoList, updatedItem]);
                    // console.log("newPlaceholderToDoList: ", newPlaceholderToDoList);
                    // setToDoList([...remainingItemsToDoList, updatedItem]);
                    // item.goal = tempGoalTotal; // it works when you comment this line out, but then it doesn't update the item.goal

                // }
                // end new update
            // }
    //         setToDoList(placeholderToDoList);
    //     }
    // }


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
            console.log({tempGoalTotal});
            const updatedItem = {...item, goal: tempGoalTotal};
            console.log({updatedItem});
            placeholderToDoList.push(updatedItem);
    //         // taskTotalGoalTime.push(item.dates.reduce((acc, item) => acc += item.date.dayGoalTime));
        } 
        console.log(placeholderToDoList)
        setToDoList(deepFreeze(placeholderToDoList));
    }


    // console.log({toDoList});

    function handleActualEdit (event, key, currentDate) {
        const newActualTime = Number(event.target.value);
        if (isNaN(newActualTime)) {
            setErrorMessage(deepFreeze("Please enter a valid number"));
        } else {
            setErrorMessage(deepFreeze(""));
            let placeholderToDoList = toDoList.map(item => {
                if (item.key === key) {
                    // const datesArr = Object.keys(item.dates); // may need to change this back
                    // console.log(item.dates);
                    for (let i=0; i<item.dates.length; i++) {
                        // console.log(currentDate);
                        let day = Object.keys(item.dates[i])[0];
                        // console.log(day);
                        // console.log(item.dates[i][day]);
                        // console.log(item.dates[i][day]["dayGoalTime"]);
                        // console.log(Object.keys(item.dates[i]));
                        if (Object.keys(item.dates[i])[0] === currentDate) {
                            item.dates[i][day]["dayActualTime"] = newActualTime;
                        }
                        // if (datesArr[i] === currentDate) {
                            // console.log(datesArr[i]);
                            // item["dates"][datesArr[i]]["dayGoalTime"] = newGoalTime;
                        // }
                    }
                    return item;
                } else {
                    return item;
                }
              })
              setToDoList(deepFreeze(placeholderToDoList));
            }
            // console.log(toDoList);
        }
            // toDoList.map(item => {
            //     if (item.key === key) {
            //         const datesArr = Object.keys(item.dates);
            //         // console.log({datesArr});
            //         for (let i=0; i<datesArr.length; i++) {
            //             if (datesArr[i] === currentDate) {
            //                 // console.log(datesArr[i]);
            //                 item["dates"][datesArr[i]]["dayActualTime"] = newActualTime;
            //             }
            //         }
            //     }
            //   })
            // setToDoList(toDoList);

    
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
                        const dayGoalTime = "";
                        return <tr key={item.key}>
                            <td className="taskEntry dailyTaskItem">
                                {item.task}
                            </td>
                            <td>
                                <span><input type="text" placeholder="Enter time in min" defaultValue={dayGoalTime} onChange={(event) => handleGoalEdit(event, key, currentDate)}/></span>
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