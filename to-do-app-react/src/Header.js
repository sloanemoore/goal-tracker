import React, { useState } from "react";
import "date-fns";

export default function Header(props) {
  const { selectedDate, onSelectedDateChange } = props;

  return (
    <>
      <div className="inline weekHeader">
        <h2 className="inline">Week of</h2>
        <input
          className="inline dateField"
          selecteddate={selectedDate}
          value={selectedDate}
          type="date"
          onChange={onSelectedDateChange}
        />
      </div>
    </>
  );
}
