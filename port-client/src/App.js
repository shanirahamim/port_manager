import React from 'react';
import './App.css';
import WsDashboard from './components/WsDashboard/WsDashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faCheckSquare, faCoffee, faShip, faSearch, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage/HomePage';
import VesselView from './components/VesselView/VesselView';

library.add( faCircle, faCheckSquare, faCoffee, faShip, faSearch,faToggleOff, faToggleOn)

function App() {
  return (
    <div className="App">
     
      
      <Router>
      <WsDashboard></WsDashboard>
        <Switch>
        <Route exact path="/" name="Port Dashboard" render={props => <HomePage {...props} />} />
        <Route exact path="/:id" name="Vessel View" render={props => <VesselView {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
