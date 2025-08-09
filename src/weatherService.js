import { form, pre } from "framer-motion/client";
import { DateTime } from "luxon";
import { useState } from "react";

const API_KEY='c8ea97256b9a686e177719063f2271cb';
const BASE_URL='https://api.openweathermap.org/data/2.5/';

const getWeatherData =async(infoType, searchParams)=>{
    const url=new URL(`${BASE_URL}${infoType}`);
    url.search=new URLSearchParams({...searchParams,appid:API_KEY});
    
    console.log(url);

    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Error fetching data:${response.statusText}`);
    }
    return response.json();
}


const iconUrlFromCode=(icon)=>`http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime=(secs, timezoneOffset, format="ccc, dd LLL yyyy hh:mm a")=>{
    return DateTime.fromSeconds(secs,{zone:'utc'})
    .plus({seconds:timezoneOffset})
    .toFormat(format)
};




const formatForecastWeather = (list, cityName, timezoneOffset, sunrise, sunset) => {
    const dailyMap = new Map();

    list.forEach(item => {
        if (!item.dt || !item.main || !item.weather || !item.weather[0]) {
            console.error("Invalid item in forecast list:", item);
            return; // Skip invalid items
        }

        const date = formatToLocalTime(item.dt, timezoneOffset, "cccc, yyyy-MM-dd");
        const time = formatToLocalTime(item.dt, timezoneOffset, "hh:mm a");

        const formattedHour = {
            time,
            temp: Math.round(item.main.temp)+"°C",
            feels_like: " "+Math.round(item.main.feels_like)+"°C",
            weather: item.weather[0].main,
            icon: iconUrlFromCode(item.weather[0].icon),
            wind_speed: Math.round(item.wind.speed)+"kmh⁻¹",
            humidity: item.main.humidity+"%",
            temp_max: Math.ceil(item.main.temp_max)+"°C",
            temp_min: Math.floor(item.main.temp_min)+"°C",
            precip: (Math.floor((item.rain?.['3h'] || item.snow?.['3h'])*25.4||0)+"mm"),
            pop :Math.round(item.pop*100)+"%",
            wind_dir:item.wind.deg,
        };

        if (!dailyMap.has(date)) {
            dailyMap.set(date, {
                date,
                city: cityName,
                temp_min: item.main.temp_min,
                temp_max: item.main.temp_max,
                weather: item.weather[0].main,
                icon: iconUrlFromCode(item.weather[0].icon),
                wind_speed: item.wind.speed,
                humidity: item.main.humidity,
                feels_like: Math.round(item.main.feels_like)+"°C",
                sunrise: formatToLocalTime(sunrise, timezoneOffset, "hh:mm a"),
                sunset: formatToLocalTime(sunset, timezoneOffset, "hh:mm a"),
                hourly: [formattedHour],
                wind_dir:item.wind.deg
            });
        } else {
            dailyMap.get(date).hourly.push(formattedHour);
        }
    });

    return Array.from(dailyMap.values());
};
const getFormattedWeatherData = async (searchParams) => {
    const forecastData = await getWeatherData("forecast", searchParams);
    const currentWeather = await getWeatherData("weather", searchParams);
    
   

     console.log("Current Weather Data", currentWeather);

    const cityName = forecastData.city.name;
    const timezoneOffset = forecastData.city.timezone;
    const { sunrise, sunset } = currentWeather.sys;
    

    const formattedForecastWeather = formatForecastWeather(
        forecastData.list, cityName, timezoneOffset, sunrise, sunset
    );
    const length = formattedForecastWeather.length;
    console.log("Formatted Forecast Weather:", formattedForecastWeather); // Debugging
    console.log("Current Weather Feels Like:", currentWeather.main.feels_like); // Debugging
    console.log(formattedForecastWeather[0].hourly.length);
    console.log(formattedForecastWeather.length)
    return {
        city: cityName,
        timezone: timezoneOffset,
        forecast: formattedForecastWeather,
        feels_like: currentWeather.main.feels_like, // Ensure this is correct
        sunrise: formatToLocalTime(sunrise, timezoneOffset, "hh:mm a"),
        sunset: formatToLocalTime(sunset, timezoneOffset, "hh:mm a"),
        length,
    };
};

export default getFormattedWeatherData;

