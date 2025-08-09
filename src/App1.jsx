import { useState, createContext, useEffect } from 'react';
import search from './assets/icons/search.svg';
import './App.css';
import { useStateContext } from './Context';
import { WeatherCard, miniCard } from './Components'; 
import MiniCard from './Components/miniCard'
import tag from './assets/images/tag.png';
import { SearchBar } from './Components/SearchBar';
import { StateContextProvider } from './Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import ImageSlider from './Components/ImageSlider';
import { time } from 'framer-motion';
import { DateTime } from 'luxon';
import { useDate } from './Utils/useDate';
import getFormattedWeatherData from './weatherService';
import logout from './assets/images/logout.png'
import LinkedIn from './assets/images/linkedin.png'


function App1() {
    const [results, setResults] = useState([]);
    const [listVisible, setListVisible] = useState(false);
    const { weather, dailyWeather,thisLocation, values, place, setPlace } = useStateContext();
    const [show, setShow]= useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [hourlyLength, setHourlyLength]=useState();
    const [visible, setVisible]= useState(false);
    const [response, setResponse] = useState(false)
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [activeIndex, setActiveIndex] =useState(null);
    const [clicked, setClicked]=useState(true);
    const [isHourlyVisible, setIsHourlyVisible]=useState(false)
    const [hourlyBtnName, setHourlyBtnName] = useState('Show | Hourly')
  const fetchWeather = async () => {
    try {
      const data = await getFormattedWeatherData({ q: place, units: 'metric' });
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  useEffect(() => {
    if (place) fetchWeather();
  }, [place]);

  // Handle city submission
  const submitCity = () => {
    setPlace(results);
    setResults('');
  };
  
  const logOut = ()=>{
    localStorage.removeItem('token');
    Navigate('/login');
  }

  const toggleSlider=()=>{
    setShow(!show);
    setVisible(false);
    setExpandedIndex(null);
}
  
const handleButtonClick = (index) =>{
    setActiveIndex(index);
    setShow(false);
    setVisible(true);
  
}

const directions = ['N','NE','E','SE','S','SW','W','NW'];


  // Toggle the visibility of the ImageSlider for a specific MiniCard
  const handleHourlyWeather = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setIsHourlyVisible(!isHourlyVisible); 
  };

  // Format time to local timezone
  const formatToLocalTime = (secs, timezoneOffset, format = 'ccc, dd LLL yyyy hh:mm a') => {
    return DateTime.fromSeconds(secs, { zone: 'utc' })
      .plus({ seconds: timezoneOffset })
      .toFormat(format);
  };

  const formattedDate = weather?.datetimeStr
    ? formatToLocalTime(Math.floor(weather.datetime / 1000), weather.timezone_offset, 'cccc, dd LLL yyyy')
    : '';

  return (
    <div className="w-full h-screen text-black background">
      <nav className="w-full flex justify-center items-center min-w-400px searchbar">
        <div className="flex justify-around items-center w-full">
          <img src={tag} className="tag h-[24px] tagline" alt="" />
          <div className="list">
            <div className="find">
              <SearchBar setResults={setResults} />
            </div>
          </div>
          <div className="btn-panel">

            
           <Link to="/"><button className='log_out'><img className='h-[15px]' src={logout} alt="" /></button> </Link>
           <Link to="https://www.linkedin.com/in/kaweesha-theekshana-5352b928a/"><button className='log_out'><img className='h-[28px]' src={LinkedIn} alt="" /></button></Link>
          </div>
        </div>
      </nav>
 
      <main className="main-content">
        {weatherData && (
           <WeatherCard
           onHourlyBtnNameChange={setHourlyBtnName}
           hourlyBtnName={hourlyBtnName}
           setHourlyBtnName={setHourlyBtnName}
           isHourlyVisible ={isHourlyVisible}
           setIsHourlyVisible={setIsHourlyVisible}
           show={show}
           clicked={clicked}
           toggleSlider={toggleSlider}
           time1={formattedDate}
           place={thisLocation}
           windspeed={weather.wspd}
           humidity={weather.humidity}
           temperature={Math.round(weather.temp)}
           heatIndex={weather.heatindex}
           iconString={weather.conditions}
           conditions={weather.conditions}
           precip={`${weather.pop}%`} 
           amount={Math.round(weather.precip*25.4)}
           uv={Math.round(weather.main?.feels_like)}
           min={Math.floor(weather.mint)}
           high={Math.ceil(weather.maxt)}
           feels_like={`${weatherData.feels_like} °C`}
           sunrise={weatherData.sunrise}
           sunset={weatherData.sunset}
           wind_direction={` | ${directions[Math.round(weather.wdir/45)%8]}`}
       />
        )}

        
{ show && (<div className="slide">
      {/*    <ImageSlider 
                temperature={temperature}
                humidity={humidity}
                conditions={conditions}
                windspeed={windspeed}
                precip={precip}
           />  */} 


           {dailyWeather.forecast[0].hourly?.slice(0, dailyWeather.forecast[0].hourly.length).map((dailyWeather, index)=>{
               return(
                <ImageSlider
                  
                key={index}
                time={dailyWeather.time}
                temperature={dailyWeather.temp}
                humidity={dailyWeather.humidity}
                conditions={dailyWeather.weather}
                windspeed={dailyWeather.wind_speed}
                precip={dailyWeather.precip}
                pop={dailyWeather.pop}
                icon={dailyWeather.icon}
                feels_like={dailyWeather.feels_like}
                temp_max={dailyWeather.temp_max}
                temp_min={dailyWeather.temp_min}
                direction = {directions[Math.round(dailyWeather.wind_dir/45)%8]}
                />
               )
           })}
           </div>)}



        <div className="mini-cards-container">
          {values?.slice(1, 14).map((curr, index) => (
            <div key={index} className="minicard-container">
              <MiniCard
              hourlyBtnName={hourlyBtnName}
              setHourlyBtnName={setHourlyBtnName}
                expandedIndex={expandedIndex}
                visible={visible}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={handleButtonClick}
                hourlyWeather={() => handleHourlyWeather(index)} // Pass the callback
                time={curr.datetime}
                temp={curr.temp}
                iconString={curr.conditions || 'default-icon'}
                precip={`${Math.round(curr.pop)}%`}
                amount={`${Math.round(curr.precip)}mm`}
                conditions={curr.conditions || 'Unknown'}
                windspeed={curr.wspd}
                humidity={curr.humidity || 0}
                mint={curr.mint}
                maxt={curr.maxt}
                feels_like={curr.heatindex}
                direction = {`|${directions[Math.round(curr.wdir/45)%8]}`}
                
              />
              {expandedIndex === index && visible && (
                <div className="image-slider-container">
                  {dailyWeather.forecast[index+1]?.hourly?.map((hourlyData, idx) => (
                    <ImageSlider className="image-slider"
                      key={idx}
                      time={hourlyData.time}
                      temperature={hourlyData.temp}
                      humidity={hourlyData.humidity}
                      conditions={hourlyData.weather}
                      windspeed={hourlyData.wind_speed}
                      precip={hourlyData.precip}
                      pop={hourlyData.pop}
                      icon={hourlyData.icon}
                      feels_like={hourlyData.feels_like}
                      temp_max={hourlyData.temp_max}
                      temp_min={hourlyData.temp_min}
                      direction = {directions[Math.round(hourlyData.wind_dir/45)%8]}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App1;