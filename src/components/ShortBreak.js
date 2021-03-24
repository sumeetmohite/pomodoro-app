import React,{useState, useEffect, useRef} from 'react';

const ShortBreak = () => {
    const[status, setStatus] = useState(false);
  const[time, setTime]= useState('5:00');
  const[millis, setMillis]= useState(300000);

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
      setTime('5:00');
      setMillis(300000);
    }  
  }
  
  useEffect(()=>{
    timerHandler();
  },[status]);
    return (
        <div className="pomodoro" style={{backgroundColor:'#74d361'}}>
            <h1>{time}</h1>
            <button className="btn" onClick={()=>toggleStatus()}>{status ? 'Stop' : 'Start'}</button>
      </div>
    )

}

export default ShortBreak