
import React from 'react';
import './VesselsList.scss';
import Vessel from '../Vessel/Vessel';
import { Link, BrowserRouter as Router, useHistory } from 'react-router-dom';

const VesselsList = ({ loading, error, vessels }) => {
    let content;
    const history = useHistory();
    
    if (loading) {
        content = (<div>    
            Loading..
        </div>);
    } else if (error) {
        content = (<div>
            Error occurred : {error}
        </div>);
    } else if (vessels && vessels.length > 0) {
        content = (<div>
            
            <ul>
                
                {vessels.map((vessel) => {
                    return (<li className="vessel-container" key={vessel.id} onClick={(e) => {
                       history.push( `/${vessel.id}`);
                        }} >
                        <Vessel vessel={vessel}></Vessel>
                        <Link to={`/${vessel.id}`}></Link>
                    </li>);
                })}
            </ul>
            
        </div>);
    }

    return (<div id="vesseles-list-container">
        {content}
    </div>);
};


export default VesselsList;