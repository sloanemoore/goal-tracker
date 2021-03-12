import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

export default function WeekTable(props) {
  const {
    toDoList,
    setToDoList,
    onAddToDoItemClick,
    onEditTaskClick,
    onDeleteIconClick,
    onInsertIconClick,
  } = props;

  const insertIcon = <FontAwesomeIcon icon={faPlusCircle} />;
  const deleteIcon = <FontAwesomeIcon icon={faMinusCircle} />;

  return (
    <>
      <table className="weekTable">
        <thead>
          <tr>
            <th className="noTableBorder"></th>
            <th className="rowHighlight" colSpan="4">
              Weekly Total
            </th>
            <th className="noTableBorder"></th>
          </tr>
          <tr>
            <td className="noTableBorder"></td>
            <td className="taskEntry">Task</td>
            <td>Goal (in min.)</td>
            <td>Actual (in min.)</td>
            <td>To Go (in min.)</td>
            <td className="noTableBorder"></td>
          </tr>
        </thead>
        <tbody>
          {toDoList.map((item, index) => {
            const key = item.key;
            let toGoClassName;
            if (item.goal - item.actual > 0) {
              toGoClassName = clsx("weekCalculatedItem", "goalNotMet");
            } else {
              toGoClassName = clsx("weekCalculatedItem", "goalMet");
            }
            return (
              <tr key={key}>
                <td className="noTableBorder">
                  <span
                    className="addIcon"
                    onClick={() => onInsertIconClick(item, index)}
                  >
                    {insertIcon}
                  </span>
                </td>
                <td className="taskEntry">
                  <span>
                    <input
                      type="text"
                      placeholder="Add a task"
                      defaultValue={item.task}
                      key={key}
                      onChange={(event) => onEditTaskClick(event, key)}
                    />
                  </span>
                </td>
                <td className="weekCalculatedItem">{item.goal}</td>
                <td className="weekCalculatedItem">{item.actual}</td>
                <td className={toGoClassName}>
                  {item.goal !== "" &&
                    item.actual !== "" &&
                    item.goal - item.actual}
                </td>
                <td className="noTableBorder">
                  <span
                    className="deleteIcon"
                    onClick={() => onDeleteIconClick(item)}
                  >
                    {deleteIcon}
                  </span>
                </td>
              </tr>
            );
          })}
          <tr>
            <td className="noTableBorder"></td>
            <td className="taskEntry">
              <span onClick={onAddToDoItemClick}>
                <input type="text" placeholder="Add a new row" disabled />
              </span>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td className="noTableBorder"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
