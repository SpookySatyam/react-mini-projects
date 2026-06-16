import {useState, useEffect} from 'react';

function App(){
  const[city, setCity]=useState("Patna");
  const[inputValue, setInputValue]=useState("");
  const[weather, setWeather]=useState(null);
  const[loading, setLoading]=useState(true);
  const[currentTime, setCurrentTime]=useState(new Date());

  const API_key="e480f2081b29b050e16e0243c95cded7";


  useEffect(()=>{
    const timer=setInterval(()=>{
      setCurrentTime(new Date());
    },1000);
    return ()=>clearInterval(timer);
  },[])

  useEffect(()=>{
    fetchWeatherData(city);
  },[]);

  const fetchWeatherData=async (city)=>{
    setLoading(true);
    try{
      const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
      const data=await response.json();

      if(response.ok){
        setWeather(data);
        console.log(data);
      }
      else{
        console.log(`City is not found in map`);
      }
    }
    catch(error){
      console.log(`Failed to fetch data`);
    }
    setLoading(false);
  }

  const handleSearch=(e)=>{
    e.preventDefault();
    if(inputValue.trim()==="") return;
    setCity(inputValue);
    fetchWeatherData(inputValue);
    setInputValue("");
  };

  const getCityTime=()=>{
    if(!weather) return "";
    const utc=currentTime.getTime()+currentTime.getTimezoneOffset()*60000;
    const cityLocalTime=new Date(utc+1000*weather.timezone);
    return cityLocalTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
  };

  return(
    <>
    <h1>Hell weather reporter app</h1>
    
    <div className='wrapper'>
      
      <div className='time'>
        <div className='currentTime'>
          <h2>Your Time</h2>
          <p>{currentTime.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit', second:'2-digit'})}</p>
          <p>{currentTime.toLocaleDateString()}</p>
        </div>
        <div className='cityTime'>
          <h2>Target City Time</h2>
          <p>{weather?getCityTime():"Loading time..."}</p>
          <p>{weather?weather.name: "..."}</p>
        </div>
      </div>
      <div className='container'>
          <form onSubmit={handleSearch} className='form'>
            <input
              type='text'
              value={inputValue}
              onChange={(e)=>setInputValue(e.target.value)}
              placeholder='search for city...'
            />
            <button type='submit'>Search</button>
          </form>
            {loading ?(
              <h2 className='loading-text'>Scouring the sky for data...</h2>
            ):weather?(
                <div className='weather-card'>
                  <h2 className='city-title'>{weather.name},{weather.sys.country}</h2>
                  <img 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt={weather.weather[0].description} 
                    className="weather-icon"
                  />
                  <h3 className='temp-display'>{Math.round(weather.main.temp)}°C</h3>
                  <p className='desc-display'>{weather.weather[0].description}</p>

                  <div className='weather-details'>
                    <p>💨 Wind: {weather.wind.speed} m/s</p>
                    <p>💧 Humidity: {weather.main.humidity}%</p>
                  </div>
                </div>
              ):(
                <p>Enter a city to extract reports.</p>
              )
            }
      </div>
    </div>
    </>
  )
}
export default App;