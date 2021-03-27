import React,{useState, useEffect, useRef} from 'react';
import './App.scss';

const App = () => {
  const[bgColor,setBgColor] = useState('#ed9090');
  const[btnColor,setBtnColor] = useState('#c44c4c');
  const[cardBg,setCardBg] = useState('#d36b6b');

  const[status, setStatus] = useState(false);
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

  const toggleStatus = () => setStatus((prevStatus) => !prevStatus);

  const intervalRef = useRef();

  const timerHandler = () => {
    if(status){ 
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
        console.log(temp, time);
        
      },1000)
    }
    if(!status){
      clearInterval(intervalRef.current);    
    }  
  }
  
  useEffect(()=>{
    timerHandler();
  },[status]);

  const changeCardHandler = (cardnum) => {
    clearInterval(intervalRef.current);
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

  /*const resetHandler = () => {
    clearInterval(intervalRef.current);
    setTime('25:00');
    setMillis(1500000);
  }*/


  return (
    
    <div className="App" style={{backgroundColor:`${bgColor}`}}>
      <div className='header'><h2>Pomodoro Timer</h2></div>
      <div className="widget-container" style={{background:`${cardBg}`}}>
        <button className='link-btn' onClick={()=>{changeCardHandler(1)}} style={btnStyle}>Pomodoro</button>
        <button className='link-btn' onClick={()=>{changeCardHandler(2)}} style={btnStyle}>Short Break</button>
        <button className='link-btn' onClick={()=>{changeCardHandler(3)}} style={btnStyle}>Long Break</button>

          <div className="pomodoro" style={{backgroundColor:`${cardBg}`}}>
            <h1>{time}</h1>
            <button className="btn" style={{background:`${btnColor}`}} onClick={()=>toggleStatus()}>{status ? 'Stop' : 'Start'}</button>
          </div>

      </div>
    </div>
  );
}

export default App;