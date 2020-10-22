
import React, { useEffect, useState } from 'react';
import './VesselView.scss';
import TimeCounter from '../TimeCounter/TimeCounter';
import * as actions from '../../actions/vessels.actions';
import { Button, Container, Label, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import VesselStatus from '../VesselStatus/VesselStatus';
import { veeselsConstants } from '../../constants/veesels.constants';

// A NOTE!
// this component acceess the api using http requests. 
// it takes data from server and not from WS and therfor could break the high availabality and reliablity of data,
// if this was a production code - I would try to overcome it by reling & sharing data coming from ws as signle source of truth.  
const VesselView = ({ match }) => {
    const [loading, setLoading] = useState(false);
    const [fired, setFired] = useState(false);
    const [vessel, setVessel] = useState(null);
    const get_vessels = useSelector(state => state.get_vessels);
    const dispatch = useDispatch();

    useEffect(() => {
        if (fired != match.params.id) {
            dispatch(actions.getById(match.params.id));
            setFired(match.params.id);
        }
    });

    useEffect(() => {
        if (get_vessels.waiting) {
            setLoading(true);
        } else {
            setLoading(false);
            if (get_vessels.veessel) {
                setVessel(get_vessels.veessel);
            }
        }
    }, [get_vessels]);


    const getOverLaps = (time) => {
        if (!time || !time.overlap_map) {
            return (<span></span>);
        }

        let overLaps = Object.values(time.overlap_map).filter((overlap) => {
            return overlap.overlap > 0;
        });

        if (overLaps.length == 0) {           
            return (<span></span>);
        }

        let now = Date.now();

        return (<div className="overlap">
            <Label>overlapping veesels: </Label>
            {overLaps.map((overlap) => {
                    return (<div className="flex" key={time.start + overlap.vesselName}>
                        {overlap.vesselName} : <TimeCounter startAt={now - overlap.overlap} endAt={now}></TimeCounter>
                    </div>)
            })}
        </div>);
    }


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
                        {getOverLaps(time)}

                    </div>
                </li>);

            })}
        </ul>)
    }

    const getTimesInDockSummary = () => {

        //todo:  this should be returned from server
        let now = Date.now();


        let totalTimeDiff = 0;
        let totalOverLapMap = {};
        vessel.timeIntervalsInTorruga.forEach((time) => {
            if (time.end) {
                totalTimeDiff += (time.end - time.start);
            } else {
                totalTimeDiff += (now - time.start);
            }

            Object.keys(time.overlap_map|| {}).forEach((overlapKey) => {

                let overlap = time.overlap_map[overlapKey];
                if (!totalOverLapMap[overlap.vesselName]) {
                    totalOverLapMap[overlap.vesselName] = { time: 0, vesselName: overlap.vesselName, id: overlapKey };
                }
                totalOverLapMap[overlap.vesselName].time += overlap.overlap;
            });
        });


        let orderedOverLapTotals = Object.values(totalOverLapMap).sort((item1, item2) => {
            if (item1.time > item2.time) {
                return -1;
            } else if (item1.time < item2.time) {
                return 1;
            } else {
                return 0;
            }
        });

        orderedOverLapTotals = orderedOverLapTotals.slice(0, 3);

        return (<Container>
            <Row className="times-in-doc-summary">
                total time inside port:
                  <TimeCounter startAt={now - totalTimeDiff}
                      endAt={(vessel.status.name == veeselsConstants.STATUSES.DOC_IN_PORT) ? null : now}></TimeCounter>
            </Row>
            <Row className="times-in-doc-summary">
                most overlapping veesels:
                <span >
                 {orderedOverLapTotals.map((overlap) => {
                     return  overlap.vesselName;
                 }).join(", ")}
                 </span>
            </Row>
        </Container>)
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
        if (vessel.status.name == veeselsConstants.STATUSES.DOC_IN_PORT) {
            action = (<Button onClick={markLeft}> mark left port </Button>);
        } else {
            action = (<Button onClick={registerArrived}> mark arrived to port </Button>);
        }

        content = (<div >
            <h3 >  {vessel.name}</h3>
            <VesselStatus status={vessel.status} timeIntervalsInTorruga={vessel.timeIntervalsInTorruga}></VesselStatus>
            {action}
            {getTimesInDock()}
            {getTimesInDockSummary()}
        </div>)
    } else {
        content = (<div >
            no Veessel to view is available
        </div>)
    }




    return (<Container className="page">
        {content}
    </Container>);
};


export default VesselView;
