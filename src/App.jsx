import { useState ,createContext} from 'react'
import search from './assets/icons/search.svg'
import './App.css'
import { useStateContext } from './Context'
import {BackgroundLayout, WeatherCard, miniCard} from './Components'
import MiniCard from './Components/miniCard'
import tag from './assets/images/tag.png'
import { SearchBar } from './Components/SearchBar'
import { SearchResultsList } from './Components/SearchResultList'
import { SearchResult } from './Components/SearchResult';
import { StateContextProvider } from './Context'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Landing from './Components/Landing'

import ProtectedRoute from './Components/ProtectedRoute'


import App1 from './App1'

function App() {
 /* const [results, setResults] = useState([]);
  const [listVisible, setListVisible] = useState(false);
  const { weather, thisLocation, values, place, setPlace } = useStateContext();

  const submitCity = async () => {
    setPlace(results);
    setResults('');
  };

  const handleResultClick = (result) => {
    setPlace(result.display_name); // Use display_name for correct value
    setListVisible(false);
  };
*/
  return (
    
     /* <div className='w-full h-screen text-black background'>
        <nav className='w-full flex justify-center items-center min-w-400px searchbar'>
          <div className='flex justify-center items-center w-full'>
            <img src={tag} className='tag h-[20px]' alt="" />
            <div className='list'>
              <div className="find">
                <SearchBar setResults={setResults} />
              </div>
             
            </div>
            <img src={tag} className='tag h-[20px] right-0' alt="" />
          </div>
        </nav>

        <main className='main-content'>
          <WeatherCard 
            place={thisLocation}
            windspeed={weather.wspd}
            humidity={weather.humidity}
            temperature={Math.round(weather.temp)}
            heatIndex={weather.heatIndex}
            iconString={weather.conditions}
            conditions={weather.conditions}
            precip={weather.precip}
            uv={weather.uvindex}
            min={Math.round(weather.mint)}
            high={Math.round(weather.maxt)}
          />
          
          <div className=''>
            {values?.slice(1, 16).map(curr => (
              <MiniCard
                key={curr.datetime}
                time={curr.datetime}
                temp={curr.temp}
                iconString={curr.conditions}
                precip={curr.precip}
                conditions={curr.conditions}
                windspeed={curr.wspd}
                humidity={curr.humidity}
              />
            ))}
          </div>
        </main>
      </div>*/
    
    <div>
      
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Landing/>}> </Route>
      
      <Route path="/register" element={<Signup/>}> </Route>
      <Route path="/login" element={<Login/>}> </Route>
     

      <Route path='/home' element={
        <ProtectedRoute>
        <App1/>
        </ProtectedRoute>}></Route>


      </Routes>
     </BrowserRouter>
    </div>

  );
}

export default App