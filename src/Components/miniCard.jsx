/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import { split } from 'postcss/lib/list'
import down from '../assets/images/down.png'
import '../index.css'
import {WiRain} from 'react-icons/wi';
import { WiStrongWind } from "react-icons/wi";
import {WiHumidity} from 'react-icons/wi';
import { WiThermometer } from "react-icons/wi";
import { WiThermometerExterior } from "react-icons/wi";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";


import {MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'


const MiniCard = ({hourlyBtnName,setHourlyBtnName,expandedIndex,handleHourlyWeather, index,activeIndex,setActiveIndex,time,day, temp, iconString,amount, precip, conditions, windspeed,humidity,hourlyWeather, mint,maxt, feels_like, direction}) => {
  const [icon, setIcon] = useState()
  const [isExpanded, setIsExpanded] = useState(false)
  const [clicked, setClicked]= useState(null)
  function rightDown(){
    const element = document.querySelector('.miniCard');
    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud)
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain)
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun)
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm)
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog)
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow)
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind)
      }else if (iconString.toLowerCase()==='overcast') {
        setIcon(cloud)
      }
    }
  }, [iconString]);

const handleButtonClick = () =>{
  setIsExpanded(!isExpanded);
  hourlyWeather(index)
  setActiveIndex(index);
  setHourlyBtnName(hourlyBtnName === 'Hide | Hourly' ? 'Show | Hourly':'Show | Hourly')
}

  return (
    <div className='miniCard'>
      <p className='over text-balance'>

       <p className='mt-3 flex flex-row'>{new Date(time).toLocaleDateString('en', {day:'numeric'})}<span>, </span>
        {new Date(time).toLocaleTimeString('en', { weekday: 'long' }).split(" ")[0]}<button onClick={handleButtonClick}>
          {expandedIndex === index ?(
            
          
          <MdKeyboardArrowDown  color='blue' size={25} className='ml-2 mt-1 drop-down'/>
          
        ):(
          <MdKeyboardArrowRight color='blue' size={25} className='ml-2 mt-1 drop-down'/>
          )}</button></p>
       
       <span className='font-bold'> {conditions}</span>
       
      </p>
      <hr />
      <div className='holder w-full flex justify-around items-center '>
       <div className="icon"> <img src={icon} alt=" forecast not available" className=' w-[3rem] h-[3rem] ' /></div>
        <div className="temp"><p className='temp text-center font-bold flex flex-col items-center mt-3 ml-5'><WiThermometer size={30}/>{temp}&deg;C</p></div>
        <div className="mint"><p className='mint1 text-center font-bold flex flex-col items center justify-around mt-3'>
         
          <p className='text-sm mt-4'>Feels like <br /> {feels_like}&deg;C</p>
        </p></div>
       <div className="conditions"> <p className='conditions text-center font-bold mt-3'><WiHumidity size={30}/>{humidity}gm/m&#179;</p></div>
      <div className="precip"><p className='precip text-center  flex flex-col items-center mt-3'><WiRain size={30}/><span className='font-bold'>{precip}</span></p></div>  

      <div className="temp"><p className='temp text-center font-bold flex flex-col items-center mt-4'><WiStrongWind size={30}/><p className='Z'><span className='font-semibold'>{windspeed}kmh⁻¹</span>{direction}</p></p></div>

      </div>
     
    </div>
  )
}

export default MiniCard