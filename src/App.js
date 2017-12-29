import './App.css';

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import RatePage from './pages/Rate';
import AboutPage from './pages/About';
import HomePage from './pages/Home';
import NoMatchPage from './pages/NoMatch';


const BasicRouter = () => (
  <Router>
    <div style={{height: '100%'}}>
      <ul style={{display: 'none'}}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rate/GBPUSD/20170217">Rate</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
     

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/rate/:currency?/:date?" component={RatePage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NoMatchPage} />
      </Switch>
    </div>
  </Router>
);

class App extends Component {
  render() {
    return (
      <BasicRouter />
    );
  }
}

export default App;
