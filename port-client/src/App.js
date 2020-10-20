import React from 'react';
import './App.css';
import WsDashboard from './components/WsDashboard/WsDashboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faCheckSquare, faCoffee, faShip, faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

library.add( faCircle, faCheckSquare, faCoffee, faShip, faSearch)

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" name="Port Dashboard" render={props => <WsDashboard {...props} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
