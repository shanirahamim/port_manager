import React from 'react';
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import VesselsList from '../VesselsList/VesselsList';
import { InputGroup, InputGroupAddon, Button, Input, Nav, NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WsDashboard.scss';

const ENDPOINT = "http://127.0.0.1:8111";

export default function WsDashboard() {
    const [vessels, setVessels] = useState([]);
    const [test, setTest] = useState("from clien");
    const [filterBy, setFilterBy] = useState({only_in_doc: false, name:""});

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        let vesselsA = vessels;

        socket.on("vessels_updated", data => {
            console.log(data);
            vesselsA = data;
            setVessels(data);
        });

        socket.on("test", (data, a) => {
            console.log(test, data, a);
            setTest(data);
        });
    }, []);


    // note: usually I would do server side searching ... 

    return (
        <div id="ws-dashboard">
            <Nav vertical id="vessels-nav">
                <NavItem >
                    <div id="filter-by">
                        <span>
                        <input placeholder="Filter Ships.." value={filterBy.name} type="text" onChange={(event) => {
                            let filter = event.target.value ? event.target.value.toLocaleLowerCase() : "";
                            setFilterBy({ ...filterBy, name: filter});
                        }} />
                        <FontAwesomeIcon icon="search" />

                        </span>
                        <span>
                        <FontAwesomeIcon icon={filterBy.only_in_doc?"toggle-on":"toggle-off"} onClick={(e) => {
                            setFilterBy({ ...filterBy, only_in_doc: !filterBy.only_in_doc})
                            }}/> show only in doc
                            </span>
                        
                    </div>
                </NavItem>
                {/* <InputGroup className="">
                <InputGroupAddon addonType="prepend">
                    <FontAwesomeIcon icon="search" />
                </InputGroupAddon>
                <Input placeholder="Filter Ships.." type="text" onChange={(event) => {
                    let filter = event.target.value? event.target.value.toLocaleLowerCase() : "";
                    setFilterBy(filter);
                }}/>
                
            </InputGroup> */}
                <NavItem >
                    <VesselsList vessels={filterBy.length == 0 ? vessels :
                        vessels.filter((vessel) => {
                            let filtered = true;
                            console.log(vessel,filterBy)
                            if(filterBy.only_in_doc){
                                filtered = vessel.status.name == "DOC_IN_PORT"; 
                            }
                            return vessel.name.toLocaleLowerCase().indexOf(filterBy.name) != -1 && filtered;
                        })}></VesselsList>
                </NavItem>
            </Nav>
            {test}
        </div>
    );
}