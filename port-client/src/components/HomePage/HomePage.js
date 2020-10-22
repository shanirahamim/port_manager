
import React from 'react';
import './HomePage.scss';
import {  Container,  Row } from 'reactstrap';
import VesselArrivedForm from '../VesselArrivedForm/VesselArrivedForm';
import { veeselsConstants } from '../../constants/veesels.constants';

const HomePage = ({ vessels }) => {
    let activeVessels = vessels.filter((vessel) => {
        return vessel.status.name == veeselsConstants.STATUSES.DOC_IN_PORT;
    });

    return (<Container className="page">
        <h2>Welcome to Port Taratuga</h2>
        <div>
            <Row> {vessels? `Total Number Of Vessels :${vessels.length}` : ''}</Row>
            <Row>{vessels? `Total Number Of Active Vessels :${activeVessels.length}` : ''}</Row>
            <Row>{vessels? `Total Number Of Non Active Vessels :${vessels.length - activeVessels.length}` : ''}</Row>
        </div>
        <VesselArrivedForm></VesselArrivedForm>
    
    </Container>);
};


export default HomePage;