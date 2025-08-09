import React from "react";
import './SearchResult.css';
import { useStateContext } from "../Context";

export const SearchResult = ({ result, onResultClick }) => {
    const { setPlace } = useStateContext();

    const handleClick = () => {
        onResultClick(result); // Pass the result to onResultClick
        alert(`You have clicked ${result.display_name}`);
    };

    return (
        <div>
            <div className="search-result" onClick={handleClick}>{result.display_name}</div>
        </div>
    );
};
