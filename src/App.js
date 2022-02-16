import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import GameScreen from './pages/GameScreen';
import ConfigScreen from './pages/ConfigScreen';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ GameScreen } />
      <Route path="/options" component={ ConfigScreen } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
