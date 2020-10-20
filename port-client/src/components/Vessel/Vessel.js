
import React from 'react';
import './Vessel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TimeCounter from '../TimeCounter/TimeCounter';
import { Button } from 'reactstrap';

const Vessel = ({ vessel }) => {

    const getStatus = () => {
        let statusClass, statusText, timerContent= ["", "", ""];


        if (!vessel.status) {
            statusClass = "status status-gray";
            statusText = "status unavailable";
            timerContent = "";
        } else {
            statusClass = `status status-${vessel.status.name == "DOC_IN_PORT" ? "green" : "gray"}`;
            statusText = vessel.status.display;

            if(vessel.status.name == "DOC_IN_PORT")
            timerContent = (<TimeCounter startAt={vessel.timeIntervalsInTorruga[vessel.timeIntervalsInTorruga.length - 1].start}
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
    }



    let content;
    if (!vessel.id) {
        content = <div></div>;
    } else {

        content = (<div>
            {getStatus()}

            <h4>
                <FontAwesomeIcon icon="ship" />
                <span>{vessel.name} </span>
            </h4>
        </div>);
    }

    return (<div className="vessel">
        {content}
    </div>);
};


export default Vessel;