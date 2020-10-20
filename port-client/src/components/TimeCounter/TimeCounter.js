
import React, { useEffect, useState } from 'react';
import './TimeCounter.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TimeCounter = ({ startAt }) => {

    const [timeInDock, setTimeInDock] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeInDock(calculateTime());
        }, 1000);


    });


    const calculateTime = () => {
        let result = timeInDock;

        if (result) { // only increase timer
            if (result.seconds == 59) {

            }

        } else {
            let timeDiff = Date.now() - startAt;
            result = {
                seconds: 0,
                minutes: 0,
                hours: 0
            };

        }

        return result;
    }

    return (<div className="timer">
        <div>
            {timeInDock.hours % 10 != 0 ? "" : "0"}
            {timeInDock.hours}
        </div>
        :
        <div>
            {timeInDock.minutes % 10 != 0 ? "" : "0"}
            {timeInDock.minutes}
        </div>
        :
        <div>
            {timeInDock.seconds % 10 != 0 ? "" : "0"}
            {timeInDock.seconds}
        </div>
    </div>);
};


export default TimeCounter;