import React ,{createContext}from 'react';
import "./SearchResultList.css";
import { SearchResult } from './SearchResult';



export const SearchResultsList = ({results,onResultClick}) => {
  return (
    <div className="results-list">
      {
        results.map((result, id)=>{
            return <SearchResult 
            key={result.id} 
            result={result} 
            onResultClick={onResultClick} />
        })
      }
    </div>
  );
}
