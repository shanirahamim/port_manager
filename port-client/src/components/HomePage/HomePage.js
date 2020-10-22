
import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container, Form } from 'reactstrap';

import VesselArrivedForm from '../VesselArrivedForm/VesselArrivedForm';

const HomePage = ({  }) => {

    return (<Container>
        <h2>Welcome to Port Taratuga</h2>
        <div>
        </div>
        <VesselArrivedForm></VesselArrivedForm>
    
    </Container>);
};


export default HomePage;