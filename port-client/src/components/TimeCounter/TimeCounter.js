
import React, { useEffect, useState } from 'react';
import './TimeCounter.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap';

const TimeCounter = ({ startAt }) => {

    const [timeInDock, setTimeInDock] = useState(false);

    useEffect(() => {

        
        const timer=setInterval(() => {
            setTimeInDock(calculateTime());
          }, 1000);
          // Clear timeout if the component is unmounted
          return () => clearTimeout(timer);
        
    },[timeInDock]);

   const calculateTime = () => {
        let result = {};

        if (timeInDock) { // only increase timer
            if (timeInDock.seconds !== 59) {
                result.seconds = timeInDock.seconds+1;
                result.minutes = timeInDock.minutes;
                result.hours = timeInDock.hours;
                result.days = timeInDock.days;
            }else{
                result.seconds = 0;

                if(result.minutes !== 59){
                    result.minutes = timeInDock.minutes + 1;
                    result.hours = timeInDock.hours;
                    result.days = timeInDock.days;
                }else{
                    result.minutes = 0;

                    if(result.hours !== 23){
                        result.hours = timeInDock.hours + 1;
                        result.days = timeInDock.days;
                    }else{
                        result.hours = 0;
                        result.days = timeInDock.days +1;
                    }   
                }
            }
        } else {
            let timeDiff = (Date.now() - startAt) / 1000;
            result = {
                seconds: Math.floor(timeDiff % 60),
                minutes:  Math.floor((timeDiff/60) % (60)),
                hours:  Math.floor((timeDiff/(60*60)) % (24)),
                days:  Math.floor(timeDiff/(60*60*24))
            };

        }        
        return result;
    }

    return (<div className="timer">
         <div>
            {timeInDock.days > 0 ? `${timeInDock.days} days   `: ""}
        </div>
        <div>
            {timeInDock.hours > 9 ? "" : "0"}
            {timeInDock.hours || 0}
        </div>
        :
        <div>
            {timeInDock.minutes > 9 ? "" : "0"}
            {timeInDock.minutes || 0}
        </div>
        :
        <div>
            {timeInDock.seconds > 9 ? "" : "0"}
            {timeInDock.seconds || 0}
        </div>
    </div>);
};


export default TimeCounter;