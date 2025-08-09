// GalleComponent.jsx
import React from 'react';
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



function GalleComponent() {
  return (
    <div>
      <h2>Welcome to Galle!</h2>
      <p>This is the Galle component, displaying special content for Galle.</p>
    </div>
  );
}

export default GalleComponent;
