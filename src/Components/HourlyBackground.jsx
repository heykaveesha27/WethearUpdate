import React, { useEffect, useState } from 'react'
import { useStateContext } from '../Context'
import '../index.css'
//images
import Clear from '../assets/images/clear-1.jpg'
import Fog from '../assets/images/fog.png'
import Cloudy from '../assets/images/p-cloudy.jpg'
import Overcast from '../assets/images/cloudy-hd.jpg' 
import Rainy from '../assets/images/rain-hd.jpg'
import Snow from '../assets/images/snow.jpg'
import Stormy from '../assets/images/Stormy.jpg'
import Drizzle from "../assets/images/drizzle.jpg"
import Sunny from '../assets/images/Sunny.jpg'

const HourlyBackground = () => {

  const { weather } = useStateContext()
  const [image, setImage] = useState(Clear)

  useEffect(() => {
    if (weather.weather?.[0]?.description) {
      let imageString = weather.weather?.[0]?.description
      if (imageString.toLowerCase().includes('clear')) {
        setImage(Clear)
      }else if(imageString.toLowerCase().includes('overcast')){
        setImage(Overcast)
      } else if (imageString.toLowerCase().includes('cloud')) {
        setImage(Cloudy)
      } else if (imageString.toLowerCase().includes('light rain') || imageString.toLowerCase().includes('shower')) {
        setImage(Rainy)
      }else if(imageString.toLowerCase().includes("moderate rain")){
        setImage(Drizzle)
      } else if (imageString.toLowerCase().includes('snow')) {
        setImage(Snow)
      } else if (imageString.toLowerCase().includes('fog')) {
        setImage(Fog)
      } else if (imageString.toLowerCase().includes('thunder') || imageString.toLowerCase().includes('storm')) {
        setImage(Stormy)
      }
    }
  }, [weather])

  return (
    <img src={image} alt="weather_image" className='h-[150px] w-[100px]' />
    
  )
}

export default HourlyBackground