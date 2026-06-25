import React, {useEffect, useState} from 'react';

function Clock() {
    const[time, setTime]=useState(new Date());

    useEffect(()=>{
        const timeId=setInterval(()=>{
            setTime(new Date());
        },1000);
        return ()=>clearInterval(timeId);
    },[]);

  return (
    <div className='text-white bg-black/50 backdrop-blur-md px-6 py-3 rounded-xl font-mono text-xl md:text-3xl font-bold tracking-wider shadow-lg border border-white/20'>
        {time.toLocaleTimeString()};
    </div>
  )
}

export default Clock