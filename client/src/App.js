import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Home from './components/home.component';
import PlayerProfile from './components/player-profile.component';
import Navigation from './components/navigation';


function App() {
  return (
    <Router>
      <Navigation />
      <Route path="/" exact component={Home}/>
      <Route path="/player/:region/:playerid" component={PlayerProfile}/>
    </Router>
  );
}

export default App;
