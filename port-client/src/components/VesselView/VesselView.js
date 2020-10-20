
import React from 'react';
import './VesselView.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TimeCounter from '../TimeCounter/TimeCounter';
import { Button, Container } from 'reactstrap';

const VesselView = ({ match }) => {
  
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
    return (<Container>
        kjljlkjljljljklj
        <h1>Vessel: </h1>
        <h3>ID: {match.params.id}</h3>
    </Container>);
};


export default VesselView;