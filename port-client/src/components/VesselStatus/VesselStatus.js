
import React from 'react';
import './VesselStatus.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TimeCounter from '../TimeCounter/TimeCounter';
import { Button } from 'reactstrap';

const VesselStatus = ({ status, timeIntervalsInTorruga }) => {

    let statusClass, statusText, timerContent = ["", "", ""];


    if (!status) {
        statusClass = "status status-gray";
        statusText = "status unavailable";
        timerContent = "";
    } else {
        statusClass = `status status-${status.name == "DOC_IN_PORT" ? "green" : "gray"}`;
        statusText = status.display;

        if (status.name == "DOC_IN_PORT")
            timerContent = (<TimeCounter startAt={timeIntervalsInTorruga[timeIntervalsInTorruga.length - 1].start}
            ></TimeCounter>);
    }

    return (<div className="status-container clickable">
        <span>
            <FontAwesomeIcon icon="circle" className={statusClass} />
            {statusText}</span>
        <div className="timer-container">
            {timerContent}
        </div>
    </div>);
};


export default VesselStatus;