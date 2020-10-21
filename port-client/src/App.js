import React from 'react';
import './App.css';
import WsDashboard from './components/WsDashboard/WsDashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faCheckSquare, faCoffee, faShip, faSearch, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage/HomePage';
import VesselView from './components/VesselView/VesselView';

library.add(faCircle, faCheckSquare, faCoffee, faShip, faSearch, faToggleOff, faToggleOn)

function App() {

  // todo: move to css & switch between classes.
  let sectionStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/sketch_1.png)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    backgroundPosition: '1px -299px',
  };

  let logoStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/logo.png)`,
    backgroundSize: '231px',
    backgroundRepeat: 'no-repeat',   
    width: '260px',
    backgroundPosition: '-4px -20px'
  }
  return (
    <div className="App" style={sectionStyle}>
      <header>
        <div className="App-header">
          <div className="logo-container">
            <div src={`${process.env.PUBLIC_URL}/img/logo.png`} style={logoStyle}></div>
            <div>{"Taratuga"}</div>
          </div>
        </div>
      </header>
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
