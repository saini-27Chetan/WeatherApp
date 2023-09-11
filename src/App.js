import Header from './Components/Header';
import Inputs from './Components/Inputs';
import TimeLocationCard from './Components/TimeLocationCard';
import WeatherDetails from './Components/WeatherDetails';
import ForecastDetails from './Components/ForecastDetails';
import getFormattedWeatherData from './JavaScriptServices/WeatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({q: "gurugram"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? (query.q.charAt(0).toUpperCase() + query.q.slice(1)) : "your Current Location.";
      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({...query, units}).then((data) =>{
        toast.success("Weather has been fetched succesfully!! for " + (data.name.charAt(0).toUpperCase() + data.name.slice(1)) + ", " + (data.country.charAt(0).toUpperCase() + data.country.slice(1)));
        if(data.details==="Thunderstorm")
          toast.warning("WARNING!!!! ThunderStorm, Don't go out", {closeOnClick: true, autoClose: false});
        setWeather(data);

      });
    };

    fetchWeather();
  }, [query, units])

  const formatBgColor = () => {
    if(!weather)
      return 'from-cyan-700 to-blue-700';
      
    const minTempLimit = units === 'metric'? 20 : 68;
    const maxTempLimit = units === 'metric'? 40 : 86;
    if(weather.temp > maxTempLimit){ 
      toast.error("ALERT!! High Temperature, take necessary precautions", {closeOnClick: true, autoClose: false});

      return 'from-yellow-700 to-orange-700';
    }            
    else if((weather.temp > minTempLimit) && (weather.temp < maxTempLimit)) 
      return 'from-yellow-700 to blue-700';
      
    return 'from-cyan-700 to-blue-700';
  }

  return (
    <div className={`mx-auto max-w-screen-md mt-4 mb-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-grey-400 ${formatBgColor()}`}>
      <Header setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather && (
        <div>
          <TimeLocationCard weather={weather}/>
          <WeatherDetails weather={weather}/>
          <ForecastDetails title="Hourly Forecast" items={weather.hourly}/>
          <ForecastDetails title="Daily Forecast" items={weather.daily}/>
        </div>
      )}
    
      <ToastContainer autoClose={2000} theme='colored' newestOnTop={true}/>

    </div>
  );
}

export default App;
