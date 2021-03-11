import React, { useState, useEffect } from "react";

// you'll need to include this function into all components
function deepFreeze(o) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (
      o.hasOwnProperty(prop) &&
      o[prop] !== null &&
      (typeof o[prop] === "object" || typeof o[prop] === "function") &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop]);
    }
  });

  return o;
}

export default function DayTable(props) {
  const [errorMessage, setErrorMessage] = useState("");

  const { currentDate, toDoList, setToDoList, index } = props;

  function handleGoalEdit(event, key, currentDate) {
    let placeholderToDoList;
    if (isNaN(Number(event.target.value))) {
      const newGoalTime = event.target.value;
      placeholderToDoList = toDoList.map((item) => {
        if (item.key === key) {
          for (let i = 0; i < item.dates.length; i++) {
            const day = Object.keys(item.dates[i])[0];
            if (day === currentDate) {
              const dateItem = { ...item.dates[i][day] };
              const updatedDateItem = { ...dateItem, dayGoalTime: newGoalTime };
              const newDates = [...item.dates];
              newDates[i] = { [day]: updatedDateItem };
              const newItem = { ...item, dates: newDates };
              return newItem;
            }
          }
        } else {
          return item;
        }
      });
      setToDoList(deepFreeze(placeholderToDoList));
      return setErrorMessage(deepFreeze("Please enter a valid number"));
    } else {
      setErrorMessage(deepFreeze(""));
      const newGoalTime = Number(event.target.value);
      placeholderToDoList = toDoList.map((item) => {
        if (item.key === key) {
          for (let i = 0; i < item.dates.length; i++) {
            const day = Object.keys(item.dates[i])[0];
            if (day === currentDate) {
              const dateItem = { ...item.dates[i][day] };
              const newDayDone = dateItem.dayActualTime > dateItem.newGoalTime;
              const newDayChecked = dateItem.dayActualTime > dateItem.newGoalTime ? dateItem.dayChecked : false; // changed this line
              const updatedDateItem = {
                ...dateItem,
                dayGoalTime: newGoalTime,
                dayDone: newDayDone,
                dayChecked: newDayChecked // changed this line
              }; 
              const newDates = [...item.dates];
              newDates[i] = { [day]: updatedDateItem };
              const newItem = { ...item, dates: newDates };
              return newItem;
            }
          }
        } else {
          return item;
        }
      });
    }
    setToDoList(
      deepFreeze(
        placeholderToDoList.map((item) => {
          if (item.key === key) {
            let tempGoalTotal = 0;
            for (let i = 0; i < item.dates.length; i++) {
              const day = Object.keys(item.dates[i])[0];
              const dayGT = Number(item.dates[i][day].dayGoalTime);
              tempGoalTotal += Number(item.dates[i][day].dayGoalTime);
            }
            const updatedItem = { ...item, goal: tempGoalTotal };
            return updatedItem;
          } else {
            return item;
          }
        })
      )
    );
  }

  function handleActualEdit(event, key, currentDate) {
    let placeholderToDoList;
    const newActualTime = Number(event.target.value);
    if (isNaN(Number(event.target.value))) {
      const newActualTime = event.target.value;

      placeholderToDoList = toDoList.map((item) => {
        if (item.key === key) {
          for (let i = 0; i < item.dates.length; i++) {
            const day = Object.keys(item.dates[i])[0];
            if (day === currentDate) {
              const dateItem = { ...item.dates[i][day] };
              const updatedDateItem = {
                ...dateItem,
                dayActualTime: newActualTime,
              };
              const newDates = [...item.dates];
              newDates[i] = { [day]: updatedDateItem };
              const newItem = { ...item, dates: newDates };
              return newItem;
            }
          }
        } else {
          return item;
        }
      });
      setToDoList(deepFreeze(placeholderToDoList));
      return setErrorMessage(deepFreeze("Please enter a valid number"));
    } else {
      const newActualTime = Number(event.target.value);
      setErrorMessage(deepFreeze(""));
      placeholderToDoList = toDoList.map((item) => {
        if (item.key === key) {
          for (let i = 0; i < item.dates.length; i++) {
            const day = Object.keys(item.dates[i])[0];
            if (day === currentDate) {
              const dateItem = { ...item.dates[i][day] };
              const newDayDone = newActualTime >= dateItem.dayGoalTime; 
              const newDayChecked = newActualTime >= dateItem.dayGoalTime ? dateItem.dayChecked : false; // changed this line
              const updatedDateItem = {
                ...dateItem,
                dayActualTime: newActualTime,
                dayDone: newDayDone,
                dayChecked: newDayChecked // changed this line
              };
              const newDates = [...item.dates];
              newDates[i] = { [day]: updatedDateItem };
              const newItem = { ...item, dates: newDates };
              return newItem;
            }
          }
        } else {
          return item;
        }
      });
    }
    setToDoList(
      deepFreeze(
        placeholderToDoList.map((item) => {
          if (item.key === key) {
            let tempActualTotal = 0;
            for (let i = 0; i < item.dates.length; i++) {
              const day = Object.keys(item.dates[i])[0];
              const dayAT = Number(item.dates[i][day].dayActualTime);
              tempActualTotal += Number(item.dates[i][day].dayActualTime);
            }
            const updatedItem = { ...item, actual: tempActualTotal };
            return updatedItem;
          } else {
            return item;
          }
        })
      )
    );
  }

  function handleCheckboxClick(event, key, currentDate) {
    const dayTaskChecked = event.target.checked;
    let placeholderToDoList = toDoList.map((item) => {
      if (item.key === key) {
        for (let i = 0; i < item.dates.length; i++) {
          const day = Object.keys(item.dates[i])[0];
          if (day === currentDate) {
            const updatedDayObj = {
              ...item.dates[i][day],
              dayChecked: dayTaskChecked,
            };
            const updatedDates = [...item.dates];
            updatedDates[i] = { [day]: updatedDayObj };
            const updatedItem = { ...item, dates: updatedDates };
            return updatedItem;
          }
        }
      } else {
        return item;
      }
    });
    setToDoList(deepFreeze(placeholderToDoList));
  }

  return (
    <div>
      <table className="tableBlock">
        <thead>
          <tr>
            <th className="rowHighlight" colSpan="4">
              {currentDate}
            </th>
          </tr>
          <tr>
            <td className="taskEntry">Task</td>
            <td>Goal (in min.)</td>
            <td>Actual (in min.)</td>
            <td>Done</td>
          </tr>
        </thead>
        <tbody>
          {toDoList.map((item) => {
            const key = item.key;

            return (
              <tr key={item.key}>
                <td className="taskEntry dailyTaskItem">{item.task}</td>
                <td>
                  <span>
                    <input
                      type="text"
                      placeholder="Enter time in min"
                      value={item.dates[index][currentDate].dayGoalTime}
                      onChange={(event) =>
                        handleGoalEdit(event, key, currentDate)
                      }
                    />
                  </span>
                </td>
                <td>
                  <span>
                    <input
                      type="text"
                      placeholder="Enter time in min"
                      value={item.dates[index][currentDate].dayActualTime}
                      onChange={(event) =>
                        handleActualEdit(event, key, currentDate)
                      }
                    />
                  </span>
                </td>
                <td>
                  {item.dates[index][currentDate].dayActualTime !== "" &&
                  !isNaN(item.dates[index][currentDate].dayActualTime) &&
                    item.dates[index][currentDate].dayGoalTime !== 0 &&
                    !isNaN(item.dates[index][currentDate].dayGoalTime) &&
                    item.dates[index][currentDate].dayActualTime >=
                      item.dates[index][currentDate].dayGoalTime && (
                      <label className="container">
                        <input
                          type="checkbox"
                          checked={item.dates[index][currentDate].dayChecked}
                          onChange={(event) =>
                            handleCheckboxClick(event, key, currentDate)
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {toDoList.map((item) => {
        const key = item.key;
        let invalidDayGoalTime =
          isNaN(item.dates[index][currentDate].dayGoalTime) &&
          item.dates[index][currentDate].dayGoalTime;
        let invalidDayActualTime =
          isNaN(item.dates[index][currentDate].dayActualTime) &&
          item.dates[index][currentDate].dayActualTime;
        return <>
        {invalidDayGoalTime && <div><span className="error">Please enter a valid goal time.</span></div>}
        {invalidDayActualTime && <div><span className="error">Please enter a valid actual time.</span></div>}
            </>;
      })}
    </div>
  );
}