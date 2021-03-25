import React,{useState} from 'react';
import './App.scss';
import {Link,BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Pomodoro from './components/Pomodoro';
import ShortBreak from './components/ShortBreak';
import LongBreak from './components/LongBreak';

const App = () => {
  const[bgColor,setBgColor] = useState('#ed9090');
  const[btnColor,setBtnColor] = useState('#c44c4c');
  const[cardBg,setCardBg] = useState('#d36b6b')
  const btnStyle = {
    backgroundColor:`${btnColor}`,
    border:'none'
  }
  return (
    <Router>
    <div className="App" style={{backgroundColor:`${bgColor}`}}>
      <div className='header'><h2>Pomodoro Timer</h2></div>
      <div className="widget-container">
        <button className='link-btn' onClick={()=>{setBgColor('#ed9393');setBtnColor('#c44c4c');setCardBg('#d36b6b')}} style={btnStyle}><Link to='/'>Pomodoro</Link></button>
        <button className='link-btn' onClick={()=>{setBgColor('#69b4ea');setBtnColor('#168ce0');setCardBg('#4d9dd6')}} style={btnStyle}><Link to='/shortBreak'>Short Break</Link></button>
        <button className='link-btn' onClick={()=>{setBgColor('#8688ba');setBtnColor('#515491');setCardBg('#6f71a8')}} style={btnStyle}><Link to='/longBreak'>Long Break</Link></button>
      
      <Switch>
        <Route exact path='/'>
          <Pomodoro btnColor={btnColor} cardBg={cardBg}/>
        </Route>
          
        <Route path='/shortBreak'>
          
          <ShortBreak btnColor={btnColor} cardBg={cardBg}/>
        </Route>

        <Route path='/longBreak'>
          <LongBreak btnColor={btnColor} cardBg={cardBg}/>
        </Route>
      </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;