import React, {useState} from "react";
import 'date-fns';

export default function Header(props) {

    return (
        <>
        <div className="inline weekHeader">
            <h2 className="inline">Week of</h2>
            <input className="inline dateField" selectedDate={props.selectedDate} type="date" onChange={props.onSelectedDateChange}/>
        </div>

        </>
    )}
