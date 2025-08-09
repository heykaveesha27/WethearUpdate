/*import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Australia');
    const [thisLocation, setLocation] = useState('');

    // Fetch weather data
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com',
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            const thisData = Object.values(response.data.locations)[0];
            setLocation(thisData.address);
            setValues(thisData.values);
            setWeather(thisData.values[0]);
        } catch (e) {
            console.error(e);
            alert('This place does not exist');
        }
    };

    // Fetch local weather data for Galle
    const fetchGalle = async () => {
        try {
            const response = await axios.get('http://localhost:3000/weather');
            const data = response.data;
            console.log(data);
            setLocation('Galle');
            setValues(data);
            setWeather(data[0]);
        } catch (e) {
            console.error(e);
            alert('Failed to fetch local weather data');
        }
    };

    useEffect(() => {
        if (place.toLowerCase() === 'galle') {
            fetchGalle();
        } else {
            fetchWeather();
        }
    }, [place]);

    useEffect(() => {
        console.log(values);
    }, [values]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place,
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);*/


import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';
import getFormattedWeatherData from "../weatherService";


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Sri Lanka');
    const [thisLocation, setLocation] = useState('');
    const [dailyWeather, setDailyWeather] = useState([]);
    // Fetch weather data from OpenWeatherMap
    const fetchWeather = async () => {
        const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/forecast`;
        const params = {
            q: place,
            units: 'metric',
            appid: apiKey,
        };
            
        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com',
            },
        };


        try {
            //Fetch Data from OpenWeatherMap
            const formattedData = await getFormattedWeatherData({ q: place,units:'metric' });
            console.log("Hourly Forecast:",formattedData);
         
               
               


            //Fetch Data from RapidApi VisualCrossing
            const response = await axios.request(options);
            console.log("Daily Weater Data:",response.data);

            //Extracting Data from those sources
            const thisData = Object.values(response.data.locations)[0];
            const thatData =formattedData;
            //updating states with fetched data
            setLocation(thisData.address);
            setValues(thisData.values);
            setWeather(thisData.values[0]);
            setDailyWeather(formattedData);
             // Get the next 7 days of weather data
             console.log("today Weather:",thisData)
             console.log("Daily Weather:", response.data);    
           
        } catch (e) {
            console.error(e);
            alert('This place does not exist');
        }
         
       /* try {
            const data = await getFormattedWeatherData({ q: place,units:'metric' });
            console.log(data);
        } catch (error) {
            console.error('Weather fetch failed:', error);
        }*/
    

        
    };

    // Fetch static local weather data for Galle


    useEffect(() => {
        
            fetchWeather();
            
    }, [place]);

    useEffect(() => {
        console.log(values);
    }, [values]);
    
   

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place,
            dailyWeather
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

