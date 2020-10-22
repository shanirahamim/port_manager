
import React, { useEffect, useState } from 'react';
import './VesselView.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TimeCounter from '../TimeCounter/TimeCounter';
import * as actions from '../../actions/vessels.actions';
import { Button, Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Vessel from '../Vessel/Vessel';
import VesselStatus from '../VesselStatus/VesselStatus';


// A NOTE!
// this component acceess the api using http requests. 
// it takes data from server ad not from WS and therfor could break the high availabality and reliablity of data,
// if this was a production code - I would try to overcome it by reling & sharing data coming from ws as signle source of truth.  
const VesselView = ({ match }) => {
    const [loading, setLoading] = useState(false);
    const [fired, setFired] = useState(false);
    const [vessel, setVessel] = useState(null);
    const get_vessels = useSelector(state => state.get_vessels);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(get_vessels);
        if (fired != match.params.id) {
            dispatch(actions.getById(match.params.id));
            setFired(match.params.id);
        }

    });

    useEffect(() => {
        console.log(get_vessels);
        if (get_vessels.waiting) {
            setLoading(true);
        } else {
            setLoading(false);
            if (get_vessels.veessel && get_vessels.veessel) {
                setVessel(get_vessels.veessel);
            }
        }
    }, [get_vessels]);


    const getTimesInDock = () => {
        return (<ul className="times-in-doc">
            {vessel.timeIntervalsInTorruga.map((time) => {
                let startDate = new Date(time.start);
                let endDate = time.end ? new Date(time.end) : false;
                return (<li key={time.start}>


                    <div className="timer-container">
                        <TimeCounter startAt={time.start} endAt={time.end}></TimeCounter>
                    from {`${startDate.toLocaleDateString()} at ${startDate.toLocaleTimeString()}`}
                        {endDate ? ` until ${endDate.toLocaleDateString()} at ${endDate.toLocaleTimeString()}` : ''}
                    </div>
                </li>);

            })}
        </ul>)
    }

    const markLeft = () => {
        dispatch(actions.markLeft(vessel));
    }

    const registerArrived = () => {
        dispatch(actions.registerArrived(vessel));
    }

    let content;

    if (loading) {
        content = (<div >loading...</div>);
    } else if (vessel && vessel.id) {

        let action;
        if (vessel.status.name == "DOC_IN_PORT") {// todo: export to const
            action = (<Button onClick={markLeft}> mark left port </Button>);
        } else {
            action = (<Button onClick={registerArrived}> mark arrived to port </Button>);
        }

        content = (<div >
            <h3 >  {vessel.name}</h3>
            <VesselStatus status={vessel.status} timeIntervalsInTorruga={vessel.timeIntervalsInTorruga}></VesselStatus>
            {action}
            {getTimesInDock()}
        </div>)
    } else {
        content = (<div >
            something went wrong
        </div>)
    }




    return (<Container className="page">
        {content}
    </Container>);
};


export default VesselView;
