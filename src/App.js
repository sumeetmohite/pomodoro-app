import React,{useState, useRef} from 'react';
import {motion} from 'framer-motion';
import './App.scss';

const App = () => {
  const[bgColor,setBgColor] = useState('#ed9090');
  const[btnColor,setBtnColor] = useState('#c44c4c');
  const[cardBg,setCardBg] = useState('#d36b6b');

  const[status, setStatus] = useState('Start');
  const[time, setTime] = useState('25:00');
  const[millis, setMillis] = useState(1500000);


  const btnStyle = {
    backgroundColor:`${btnColor}`,
    border:'none'
  }
  const audio = new Audio('sounds/alarm_tone.mp3');

  function convert(millis) {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const toggleStatus = () => {
    if(status === 'Start'){
      setStatus('Stop')
    }
    if(status === 'Stop'){
      setStatus('Start')
    }
    timerHandler();
  }

  const intervalRef = useRef();

  const timerHandler = () => {
    if(status === 'Start'){ 
      let temp = millis;
      if(millis)
      intervalRef.current = setInterval(function(){
        if(temp === 1000){
          audio.play();
          clearInterval(intervalRef.current);
        }
        temp = temp - 1000;
        setMillis(temp);
        setTime(convert(temp));        
      },1000)
    }
    if(status === 'Stop'){
      clearInterval(intervalRef.current);
      console.log(time, millis);
    }  
  }
  

  const changeCardHandler = (cardnum) => {
    clearInterval(intervalRef.current);
    setStatus('Start')
    if(cardnum === 1){
      setTime('25:00');
      setMillis(1500000);
      setBgColor('#ed9090');
      setCardBg('#d36b6b');
      setBtnColor('#c44c4c');
    }
    else if(cardnum === 2){
      setTime('5:00');
      setMillis(300000);
      setBgColor('#9395bc');
      setCardBg('#8688ba');
      setBtnColor('#6f71a8');
    }
    else if(cardnum === 3){
      setTime('15:00');
      setMillis(900000);
      setBgColor('#8bbfba');
      setCardBg('#69b4ae');
      setBtnColor('#5d9e97');
    }
  }

  const resetHandler = () => {
    setStatus('Start');
    clearInterval(intervalRef.current);
    if(cardBg === '#d36b6b'){
      setTime('25:00');
      setMillis(1500000);
    }
    else if(cardBg === '#8688ba'){
      setTime('5:00');
      setMillis(300000);
    }
    else if(cardBg === '#69b4ae'){
      setTime('15:00');
      setMillis(900000);
    }
    
  }


  return (
    
    <motion.div className="App" style={{backgroundColor:`${bgColor}`}} >
      <div className='header'><motion.h2 initial={{y:-200}} animate={{y:0}}>Pomodoro Timer</motion.h2></div>
      <motion.div className="widget-container" style={{background:`${cardBg}`}}
      initial={{y:-200}} animate={{y:0}}>
        <button className='link-btn' onClick={()=>{changeCardHandler(1)}} style={btnStyle}>Pomodoro</button>
        <button className='link-btn' onClick={()=>{changeCardHandler(2)}} style={btnStyle}>Short Break</button>
        <button className='link-btn' onClick={()=>{changeCardHandler(3)}} style={btnStyle}>Long Break</button>

          <div className="pomodoro" style={{backgroundColor:`${cardBg}`}}>
            <h1>{time}</h1>
            <button className="btn" style={{background:`${btnColor}`}} onClick={()=>toggleStatus()}>{status}</button>
            <button className="btn" style={{background:`${btnColor}`}} onClick={()=> resetHandler()}>Reset</button>
          </div>

      </motion.div>
    </motion.div>
  );
}

export default App;