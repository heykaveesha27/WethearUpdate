import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; 
import "./SearchBar.css";
import { SearchResultsList } from './SearchResultList';
import { useStateContext } from "../Context";

export const SearchBar = () => {
    const [results, setResults] = useState([]);
    const [value, setValue] = useState('');
    const { setPlace } = useStateContext(); 

    const fetchData = (value) => {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`)
        .then(response => response.json())
        .then(json => {
            const filteredResults = json.filter(user => {
                return (
                    value &&
                    user &&
                    user.display_name &&
                    typeof user.display_name === 'string' &&
                    user.display_name.toLowerCase().includes(value.toLowerCase())
                );
            });
            setResults(filteredResults);
        });
    };

    const onChange = (event) => {
        setValue(event.target.value);
        fetchData(event.target.value);
    };

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        setPlace(searchTerm);
        console.log('search', searchTerm);
    };

   const handleKEyPress=(event)=>{
    if(event.key==='Enter' && value){
        onSearch(value);
    }
   }


    return (
        <div className='input-wrapper'> 
            <div className='search-inner'>
                <FaSearch id='search-icon'/> 
                <input type='text' 
                className='p-1'
                value={value} 
                onChange={onChange} 
                onKeyDown={handleKEyPress}
                placeholder='Search for a city'
                />
                <div className="results-list">
                    {results.filter(item => {
                        const searchTerm = value.toLowerCase();
                        const display_name = item.display_name && item.display_name.toLowerCase();
                        return searchTerm && display_name && display_name.startsWith(searchTerm) && display_name !== searchTerm;
                    }).map((item, index) => (
                        <div className="search-result" key={index} onClick={() => onSearch(item.display_name)}>
                            {item.display_name} 
                        </div>
                    ))}
                </div>
            </div>  
        </div>
    );
};
