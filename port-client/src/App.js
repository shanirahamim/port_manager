import React, { useState } from 'react';
import './App.scss';
import WsDashboard from './components/WsDashboard/WsDashboard';
import { BrowserRouter as Router, Link, Route, Switch, useHistory } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faCheckSquare, faCoffee, faShip, faSearch, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage/HomePage';
import VesselView from './components/VesselView/VesselView';

library.add(faCircle, faCheckSquare, faCoffee, faShip, faSearch, faToggleOff, faToggleOn)

function App() {
  const [vesselsArray, setVesselsArray] = useState([]);

  const onVesselsUpdated = (vessels) => {
    setVesselsArray(vessels);
  }

  return (
    <div className="App" >
    <Router>
      <header>
        <div className="App-header">
          <Link className="logo-container" to="/">
            <div src={`${process.env.PUBLIC_URL}/img/logo.png`} className="logo"></div>
          .
          </Link>
        </div>
      </header>
      
        <WsDashboard onVesselsUpdated={onVesselsUpdated}></WsDashboard>
        <Switch>
          <Route exact path="/" name="Port Dashboard" render={props => <HomePage vessels={vesselsArray} {...props} />} />
          <Route exact path="/:id" name="Vessel View" render={props => <VesselView {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
