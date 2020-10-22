
import React from 'react';
import './Vessel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VesselStatus from '../VesselStatus/VesselStatus';

const Vessel = ({ vessel }) => {

    let content;
    if (!vessel.id) {
        content = <div></div>;
    } else {

        content = (<div>
            <VesselStatus status={vessel.status} timeIntervalsInTorruga={vessel.timeIntervalsInTorruga}></VesselStatus>

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