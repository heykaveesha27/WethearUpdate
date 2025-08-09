import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clear from '../assets/images/clear-1.jpg'
import Fog from '../assets/images/fog.png'
import Cloudy from '../assets/images/p-cloudy.jpg'
import './ImageSlider.css'
import { div } from "framer-motion/client";
import HourlyBackground from "./HourlyBackground";
import {WiRain} from 'react-icons/wi';
import { WiStrongWind } from "react-icons/wi";
import {WiHumidity} from 'react-icons/wi';
import { WiThermometer } from "react-icons/wi";
import { WiThermometerExterior } from "react-icons/wi";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";


const ImageSlider = ({
  
  time,
  icon,
  temperature,
  conditions,
  windspeed,
  humidity,
  precip,
  pop,
  feels_like,
  temp_max,
  temp_min,
  direction,
 
}) => {
{/* const sliderSettings = {
    dots: false,
    arrows:false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode:true,
    centerPadding:"20px",
    
  };

  const sliderImages = [
    {src:Clear},
    { src:Fog },
    { src:Cloudy},
  ];{precip}
*/}

function showhide(){
    
}




  return (
   
    <div className="slides  mt-1 mb-1 flex  mx-3  text-black overflow-clip">
     {/* <Slider {...sliderSettings}>*/ }
      
      
        
          
           
            
            <div className="flex flex-grow justify-around items-center  bg-zinc-300 pl-8 pr-8 hover:bg-zinc-400 parent">
            <div className="w-fit flex justify-center align-middle"><p className="mt-3">{time}</p></div>
            <img src={icon} alt="weather_icon" className="h-[75px] mt-2 weather-icon" />
            <div className="conditions2 w-[100px] flex justify-center align-middle"><p className="mt-3">{conditions}</p></div>
            <div className="rain w-fit flex flex-row justify-center mt-1 items-center">
            <WiRain className="text-4xl text-white icon1" />
            <div className="w-[120px] flex flex-row justify-center ml-[-10px]"> <p className="text-lg font-bold justify-center mt-0 mb-0">{precip} </p>
            <p className="mt-[2px] mb-0">|{pop}</p>
            </div>    
            </div>
            <div className="thermo w-fit flex flex-row justify-between "><WiThermometer className="text-4xl  text-gray-100 mt-2.5 mr-2 icon1"/><p className="mt-3 w-[50px]">{temperature}</p></div>
            <div className="w-fit flex flex-col  slide-up items-center">
              <p className="mt-3 mb-3 flex flex-row"><FaTemperatureArrowUp className="mt-1 "/>{temp_max}</p>
              <p className="mt-3 mb-3 flex flex-row" ><FaTemperatureArrowDown className="mt-1"/>{temp_min}</p>
              
              <p className="mt-3 mb-3">feels:{feels_like}</p>
            </div>
            <div className="w-fit flex flex-row justify-around humid"><WiHumidity className=" text-4xl text-white mt-2 mr-2 icon1"/><p className="mt-3">{humidity}</p></div>
            <div className="wind w-[120px] flex flex-row justify-around wind"><WiStrongWind className="text-4xl text-white mt-4 mr-2 icon1"/> <p className="mt-[30px] flex">{windspeed}|<p className="font-bold">{direction}</p></p></div> 
           </div>
          
      
      {/* </Slider>*/ }
       </div>
   
  );
};

export default ImageSlider;