import React from 'react';
import './App.scss';
import {Link,BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Pomodoro from './components/Pomodoro';
import ShortBreak from './components/ShortBreak';
import LongBreak from './components/LongBreak';

const App = () => {
  return (
    <Router>
    <div className="App">
      <div className="widget-container">
      <button className='link-btn'><Link to='/'>Pomodoro</Link></button>
      <button className='link-btn'><Link to='/shortBreak'>Short Break</Link></button>
      <button className='link-btn'><Link to='/longBreak'>Long Break</Link></button>
      
      <Switch>
        <Route exact path='/'>
          <Pomodoro/>
        </Route>
          
        <Route path='/shortBreak'>
          
          <ShortBreak/>
        </Route>

        <Route path='/longBreak'>
          <LongBreak/>
        </Route>
      </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
