
import React from 'react';
import './VesselsList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Vessel from '../Vessel/Vessel';

const VesselsList = ({ loading, error, vessels }) => {
    let content;
    
//   async function fetchData() {
//     const res = await fetch("https://swapi.co/api/planets/4/");
//     res
//       .json()
//       .then(res => setPlanets(res))
//       .catch(err => setErrors(err));
//   }

//   useEffect(() => {
//     fetchData();
//   });

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
                    return (<li className="vessel-container" key={vessel.id} >
                        <Vessel vessel={vessel}></Vessel>
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