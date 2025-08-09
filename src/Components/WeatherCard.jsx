import React, { useEffect, useState } from 'react';
import BackgroundLayout from './BackgroundLayout';
import { useDate } from '../Utils/useDate';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import '../index.css';
import { MdHeight } from 'react-icons/md';
import HourlyBackground from './HourlyBackground';
import { DateTime } from 'luxon';


const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
  color,
  precip,
  uv,
  min,
  high,
  amount,
  time1,
  sunrise,
  sunset,
  toggleSlider,
  feels_like,
  show,
  clicked,
  isHourlyVisible,
  setIsHourlyVisible,
  onHourlyBtnNameChange,
  hourlyBtnName,
  setHourlyBtnName,
  wind_direction,
}) => {
  const [icon, setIcon] = useState(sun)
  //const [isHourlyVisible, setIsHourlyVisible] = useState(false);
  const [isHide, setIsHide]=useState(false);
  const { time } = useDate()
  
  const Hourly_Btn_Name =isHourlyVisible ? 'Hide | Hourly' : 'Show | Hourly';
  

  useEffect(()=>{
    if (onHourlyBtnNameChange){
      onHourlyBtnNameChange(Hourly_Btn_Name);
    }
  },[onHourlyBtnNameChange]);

  const handleButtonClick=()=>{
    setIsHourlyVisible(!isHourlyVisible);
    toggleSlider();
    setHourlyBtnName(hourlyBtnName === 'Show | Hourly' ? 'Hide | Hourly' : 'Show | Hourly')
  }
 
  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud);color='#FFFFFF';
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain);color='#000000';
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun);color='#FFFFFF';
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm);color='#FFFFFF';
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog);color='#FFFFFF';
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow);color='#FFFFFF';
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind);color='#FFFFFF';
      }

    }
  }, [iconString]);

   


  return (
    <div className='weatherCard'>
      
      <BackgroundLayout></BackgroundLayout>
         <div className='weather-place'>
        {place}
       
        <p className=''>{time1}</p>
      </div>
      <div className='weather-data'>
        <div className='flex justify-evenly'>
        
        <p className='flex-col justify-center align-middle mt-3 text-center'><p className='text-[36px]'>{min}&deg;C</p>minimum-temperature</p>
        <p className='weather-temp'>{temperature} &deg;C</p>
        <p className='flex-col justify-center align-middle mt-3 text-center'><p className='text-[36px]'>{high}&deg;C</p>maximum-temperature</p>
        
        
        </div>
        
        
       
        <div className='flex justify-between items-center mt-2 gap-0 glassCard h-16'>
       
        <p className='flex-1 text-center p-1 mt-3 mb-0 font-bold rounded-lg '>Rain<p className='font-normal'>{precip} ({amount}mm)</p></p>
        <p className='flex-1 text-center p-1 mt-3 mb-0 font-bold   rounded-lg'>Feels Like<p className='font-normal'>{feels_like}</p></p>
        <p className='flex-1 text-center p-1 mt-3 mb-0 font-bold rounded-lg'>Humidity <p className='font-normal'>{humidity} gm/m&#179;</p></p>
        <p className='flex-1 text-center p-1 mt-3 mb-0 font-bold   rounded-lg'>Wind<p className='font-normal'>{windspeed} kmh⁻¹<span className='font-bold'>{wind_direction}</span></p></p>
     
      </div>
      </div>
   
     

      <div className='flex justify-between items-center mt-2 gap-0 h-16'>
        <p className='flex-1 text-center p-0 mt-10 mb-0 font-bold   rounded-lg'>Sunrise<p className='font-normal'>{sunrise}</p></p>
        <p className='flex-1 text-center p-0 mt-10 mb-0 font-bold   rounded-lg'>Sunset<p className='font-normal'>{sunset}</p></p>
      </div>
      <hr className='bg-white bg-opacity-65 h-0.5'/>
      
      <div className='details'>
     <div > <button className='hourly-btn mt-[-10px]' onClick={handleButtonClick}>
       {hourlyBtnName}
      </button></div>
      <div className="w-[100%] flex justify-center items-center mr-[120px] mt-2 "><p  className='conditions1'> {conditions?.toUpperCase()}</p></div>
      
      </div>
     
    </div>
  );
};

export default WeatherCard;
